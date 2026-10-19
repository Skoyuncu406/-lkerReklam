"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import cloudinary from "@/lib/cloudinary";

// ==========================================
// AYARLAR
// ==========================================

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// ==========================================
// FORM VERİLERİNİ DOĞRULA
// ==========================================

function getFields(formData) {
  const name = String(formData.get("name") || "").trim();

  const orderValue = formData.get("order");
  const order = Number(orderValue);

  const active = formData.get("active") === "on";

  // Firma adı isteğe bağlıdır.
  if (name.length > 150) {
    throw new Error("Firma adı en fazla 150 karakter olabilir.");
  }

  if (
    orderValue === null ||
    String(orderValue).trim() === "" ||
    !Number.isSafeInteger(order) ||
    order < 0
  ) {
    throw new Error("Geçerli bir sıralama değeri giriniz.");
  }

  return {
    name: name || null,
    order,
    active,
  };
}

// ==========================================
// CLOUDINARY LOGO YÜKLEME
// ==========================================

async function uploadLogo(file) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return null;
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Yalnızca JPG, PNG ve WebP yüklenebilir.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Logo en fazla 5 MB olabilir.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploaded = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ulker-tabela/references",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error("Logo yüklenemedi."));
        } else {
          resolve(result);
        }
      },
    );

    stream.end(buffer);
  });

  return {
    logo: uploaded.secure_url,
    publicId: uploaded.public_id,
  };
}

// ==========================================
// CLOUDINARY LOGO SİLME
// ==========================================

async function deleteCloudinaryLogo(publicId) {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });
}

// ==========================================
// LOGO TEMİZLEME - GÜVENLİ YARDIMCI
// ==========================================

async function safelyDeleteLogo(publicId, errorMessage) {
  if (!publicId) return;

  try {
    await deleteCloudinaryLogo(publicId);
  } catch (error) {
    console.error(errorMessage, error);
  }
}

// ==========================================
// CACHE GÜNCELLEME
// ==========================================

function refreshReferences() {
  revalidatePath("/");
  revalidatePath("/admin/referanslar");
}

// ==========================================
// YENİ REFERANS EKLE
// ==========================================

export async function createReference(formData) {
  await requireAdmin();

  const fields = getFields(formData);

  const file = formData.get("logo");

  // Logo yüklenmeden önce de boş formu engelle.
  const hasLogoFile =
    file && typeof file.arrayBuffer === "function" && file.size > 0;

  if (!fields.name && !hasLogoFile) {
    throw new Error("Firma adı veya firma logosu eklemelisiniz.");
  }

  const uploaded = await uploadLogo(file);

  // En az bir alan dolu olmalı.
  if (!fields.name && !uploaded?.logo) {
    throw new Error("Firma adı veya firma logosu eklemelisiniz.");
  }

  try {
    await prisma.reference.create({
      data: {
        ...fields,
        logo: uploaded?.logo ?? null,
        publicId: uploaded?.publicId ?? null,
      },
    });
  } catch (error) {
    // Veritabanı kaydı başarısız olursa
    // yeni yüklenen logoyu temizle.
    await safelyDeleteLogo(
      uploaded?.publicId,
      "Yeni referans logosu temizlenemedi:",
    );

    throw error;
  }

  refreshReferences();

  redirect("/admin/referanslar");
}

// ==========================================
// REFERANS DÜZENLE
// ==========================================

export async function updateReference(referenceId, formData) {
  await requireAdmin();

  const fields = getFields(formData);

  const existing = await prisma.reference.findUnique({
    where: {
      id: referenceId,
    },
  });

  if (!existing) {
    throw new Error("Referans bulunamadı.");
  }

  const file = formData.get("logo");

  const removeLogo = formData.get("removeLogo") === "on";

  const hasNewLogo =
    file && typeof file.arrayBuffer === "function" && file.size > 0;

  // Logo kaldırılıyorsa veya mevcut logo yoksa,
  // en azından firma adı ya da yeni logo olmalı.
  const willHaveLogo =
    Boolean(hasNewLogo) || (Boolean(existing.logo) && !removeLogo);

  if (!fields.name && !willHaveLogo) {
    throw new Error("Firma adı ve logo aynı anda boş bırakılamaz.");
  }

  const uploaded = await uploadLogo(file);

  const shouldReplaceLogo = Boolean(uploaded);

  // Yeni logo varsa kaldırma işaretinden
  // daha önceliklidir.
  const shouldRemoveLogo = removeLogo && !shouldReplaceLogo;

  const finalLogo = shouldReplaceLogo
    ? uploaded.logo
    : shouldRemoveLogo
      ? null
      : existing.logo;

  // Son kayıt durumunu kontrol et.
  if (!fields.name && !finalLogo) {
    await safelyDeleteLogo(
      uploaded?.publicId,
      "Geçersiz işlem sonrası logo temizlenemedi:",
    );

    throw new Error("Firma adı veya firma logosu bulunmalıdır.");
  }

  const data = {
    ...fields,
  };

  if (shouldReplaceLogo) {
    data.logo = uploaded.logo;
    data.publicId = uploaded.publicId;
  } else if (shouldRemoveLogo) {
    data.logo = null;
    data.publicId = null;
  }

  try {
    await prisma.reference.update({
      where: {
        id: referenceId,
      },
      data,
    });
  } catch (error) {
    // Veritabanı güncellemesi başarısız olursa
    // yeni yüklenen logoyu temizle.
    await safelyDeleteLogo(uploaded?.publicId, "Yeni logo temizlenemedi:");

    throw error;
  }

  // Veritabanı güncellendikten sonra
  // artık kullanılmayan eski logoyu temizle.
  if ((shouldReplaceLogo || shouldRemoveLogo) && existing.publicId) {
    await safelyDeleteLogo(
      existing.publicId,
      "Eski referans logosu temizlenemedi:",
    );
  }

  refreshReferences();

  redirect("/admin/referanslar");
}

// ==========================================
// REFERANS SİL
// ==========================================

export async function deleteReference(referenceId) {
  await requireAdmin();

  const existing = await prisma.reference.findUnique({
    where: {
      id: referenceId,
    },
  });

  if (!existing) {
    throw new Error("Referans bulunamadı.");
  }

  // Önce PostgreSQL kaydını sil.
  await prisma.reference.delete({
    where: {
      id: referenceId,
    },
  });

  // Ardından Cloudinary logosunu temizle.
  await safelyDeleteLogo(
    existing.publicId,
    "Silinen referansın logosu temizlenemedi:",
  );

  refreshReferences();
}
