"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function refreshPages(serviceId) {
  revalidatePath("/admin");
  revalidatePath("/admin/hizmetler");
  revalidatePath(`/admin/hizmetler/${serviceId}/duzenle`);
}

function validateFile(file) {
  if (!(file instanceof File) || file.size === 0) {
    return "Lütfen bir görsel seçiniz.";
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Yalnızca JPG, PNG ve WebP yükleyebilirsiniz.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Görsel en fazla 5 MB olabilir.";
  }

  return null;
}

async function uploadToCloudinary(file) {
  const bytes = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ulker-tabela/services",
        resource_type: "image",
        overwrite: false,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    stream.end(bytes);
  });
}

async function cleanupCloudinary(publicId) {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
  } catch (error) {
    console.error("Cloudinary temizleme hatası:", error);
  }
}

// YENİ GÖRSEL YÜKLE
export async function uploadServiceImage(formData) {
  await requireAdmin();

  const serviceId = formData.get("serviceId");
  const file = formData.get("image");

  if (typeof serviceId !== "string" || !serviceId.trim()) {
    return { success: false, message: "Geçersiz hizmet." };
  }

  const fileError = validateFile(file);
  if (fileError) {
    return { success: false, message: fileError };
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { id: true, title: true },
  });

  if (!service) {
    return { success: false, message: "Hizmet bulunamadı." };
  }

  let uploadedPublicId = null;

  try {
    const result = await uploadToCloudinary(file);
    uploadedPublicId = result.public_id;

    const lastImage = await prisma.serviceImage.findFirst({
      where: { serviceId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    await prisma.serviceImage.create({
      data: {
        serviceId,
        src: result.secure_url,
        publicId: result.public_id,
        alt: service.title,
        order: (lastImage?.order ?? -1) + 1,
      },
    });

    refreshPages(serviceId);

    return {
      success: true,
      message: "Görsel başarıyla yüklendi.",
    };
  } catch (error) {
    console.error("Görsel yükleme hatası:", error);

    if (uploadedPublicId) {
      await cleanupCloudinary(uploadedPublicId);
    }

    return {
      success: false,
      message: "Görsel yüklenemedi.",
    };
  }
}

// GÖRSELİ DEĞİŞTİR VEYA BOŞ ALANI DOLDUR
export async function replaceServiceImage(formData) {
  await requireAdmin();

  const imageId = formData.get("imageId");
  const file = formData.get("image");

  if (typeof imageId !== "string" || !imageId.trim()) {
    return { success: false, message: "Geçersiz görsel." };
  }

  const fileError = validateFile(file);
  if (fileError) {
    return { success: false, message: fileError };
  }

  const image = await prisma.serviceImage.findUnique({
    where: { id: imageId },
    include: {
      service: {
        select: { title: true },
      },
    },
  });

  if (!image) {
    return { success: false, message: "Görsel bulunamadı." };
  }

  let uploadedPublicId = null;

  try {
    const result = await uploadToCloudinary(file);
    uploadedPublicId = result.public_id;

    await prisma.serviceImage.update({
      where: { id: imageId },
      data: {
        src: result.secure_url,
        publicId: result.public_id,
        alt: image.service.title,
      },
    });

    if (image.publicId) {
      await cleanupCloudinary(image.publicId);
    }

    refreshPages(image.serviceId);

    return {
      success: true,
      message: "Görsel başarıyla güncellendi.",
    };
  } catch (error) {
    console.error("Görsel değiştirme hatası:", error);

    if (uploadedPublicId) {
      await cleanupCloudinary(uploadedPublicId);
    }

    return {
      success: false,
      message: "Görsel değiştirilemedi.",
    };
  }
}

// GÖRSELİ SİL
export async function deleteServiceImage(imageId) {
  await requireAdmin();

  if (typeof imageId !== "string" || !imageId.trim()) {
    return { success: false, message: "Geçersiz görsel." };
  }

  try {
    const image = await prisma.serviceImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return { success: false, message: "Görsel bulunamadı." };
    }

    if (image.publicId) {
      const result = await cloudinary.uploader.destroy(image.publicId, {
        resource_type: "image",
        invalidate: true,
      });

      if (!["ok", "not found"].includes(result.result)) {
        throw new Error("Cloudinary silme işlemi başarısız.");
      }
    }

    await prisma.serviceImage.delete({
      where: { id: imageId },
    });

    refreshPages(image.serviceId);

    return {
      success: true,
      message: "Görsel başarıyla silindi.",
    };
  } catch (error) {
    console.error("Görsel silme hatası:", error);

    return {
      success: false,
      message: "Görsel silinemedi.",
    };
  }
}

// GÖRSEL SIRASINI DEĞİŞTİR
export async function moveServiceImage(imageId, direction) {
  await requireAdmin();

  if (
    typeof imageId !== "string" ||
    !imageId.trim() ||
    !["up", "down"].includes(direction)
  ) {
    return {
      success: false,
      message: "Geçersiz sıralama işlemi.",
    };
  }

  try {
    const image = await prisma.serviceImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return {
        success: false,
        message: "Görsel bulunamadı.",
      };
    }

    const images = await prisma.serviceImage.findMany({
      where: { serviceId: image.serviceId },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: { id: true },
    });

    const currentIndex = images.findIndex((item) => item.id === imageId);

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (
      currentIndex === -1 ||
      targetIndex < 0 ||
      targetIndex >= images.length
    ) {
      return {
        success: false,
        message: "Görsel bu yönde taşınamaz.",
      };
    }

    const reordered = [...images];

    [reordered[currentIndex], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[currentIndex],
    ];

    await prisma.$transaction(
      reordered.map((item, index) =>
        prisma.serviceImage.update({
          where: { id: item.id },
          data: { order: index },
        }),
      ),
    );

    refreshPages(image.serviceId);

    return {
      success: true,
      message: "Görsel sırası güncellendi.",
    };
  } catch (error) {
    console.error("Görsel sıralama hatası:", error);

    return {
      success: false,
      message: "Görsel sırası değiştirilemedi.",
    };
  }
}
