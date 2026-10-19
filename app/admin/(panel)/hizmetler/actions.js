"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import prisma from "@/lib/prisma";

// HİZMET FORMU DOĞRULAMA
function validateService(formData) {
  const title = String(formData.get("title") ?? "").trim();

  // Açıklama isteğe bağlıdır.
  // Boş bırakılırsa veritabanına boş string kaydedilir.
  const description = String(formData.get("description") ?? "").trim();

  const orderValue = String(formData.get("order") ?? "");
  const order = Number(orderValue);

  const active = formData.get("active") === "on";

  // HİZMET BAŞLIĞI
  if (title.length < 3 || title.length > 150) {
    return {
      error: "Hizmet başlığı 3–150 karakter olmalıdır.",
    };
  }

  // HİZMET AÇIKLAMASI (İSTEĞE BAĞLI)
  if (description.length > 5000) {
    return {
      error: "Hizmet açıklaması en fazla 5000 karakter olabilir.",
    };
  }

  // GÖRÜNTÜLEME SIRASI
  if (
    orderValue.trim() === "" ||
    !Number.isSafeInteger(order) ||
    order < 0 ||
    order > 9999
  ) {
    return {
      error: "Geçerli bir sıralama değeri giriniz.",
    };
  }

  return {
    data: {
      title,
      description,
      order,
      active,
    },
  };
}

// İLGİLİ SAYFALARIN ÖNBELLEĞİNİ YENİLE
function refreshServices() {
  revalidatePath("/admin");
  revalidatePath("/admin/hizmetler");
  revalidatePath("/");
}

// YENİ HİZMET OLUŞTUR
export async function createService(prevState, formData) {
  await requireAdmin();

  const result = validateService(formData);

  if (result.error) {
    return {
      success: false,
      message: result.error,
    };
  }

  try {
    await prisma.service.create({
      data: result.data,
    });

    refreshServices();

    return {
      success: true,
      message: "Hizmet başarıyla eklendi.",
    };
  } catch (error) {
    console.error("Hizmet ekleme hatası:", error);

    return {
      success: false,
      message: "Hizmet kaydedilemedi. Tekrar deneyiniz.",
    };
  }
}

// MEVCUT HİZMETİ GÜNCELLE
export async function updateService(serviceId, prevState, formData) {
  await requireAdmin();

  if (typeof serviceId !== "string" || !serviceId.trim()) {
    return {
      success: false,
      message: "Geçersiz hizmet kimliği.",
    };
  }

  const result = validateService(formData);

  if (result.error) {
    return {
      success: false,
      message: result.error,
    };
  }

  try {
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { id: true },
    });

    if (!existingService) {
      return {
        success: false,
        message: "Düzenlenecek hizmet bulunamadı.",
      };
    }

    await prisma.service.update({
      where: { id: serviceId },
      data: result.data,
    });

    refreshServices();

    return {
      success: true,
      message: "Hizmet başarıyla güncellendi.",
    };
  } catch (error) {
    console.error("Hizmet güncelleme hatası:", error);

    return {
      success: false,
      message: "Hizmet güncellenemedi. Tekrar deneyiniz.",
    };
  }
}

// HİZMET SİL
export async function deleteService(serviceId) {
  await requireAdmin();

  if (typeof serviceId !== "string" || !serviceId.trim()) {
    return {
      success: false,
      message: "Geçersiz hizmet kimliği.",
    };
  }

  try {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { id: true },
    });

    if (!service) {
      return {
        success: false,
        message: "Silinecek hizmet bulunamadı.",
      };
    }

    await prisma.service.delete({
      where: { id: serviceId },
    });

    refreshServices();

    return {
      success: true,
      message: "Hizmet başarıyla silindi.",
    };
  } catch (error) {
    console.error("Hizmet silme hatası:", error);

    return {
      success: false,
      message: "Hizmet silinemedi. Tekrar deneyiniz.",
    };
  }
}
