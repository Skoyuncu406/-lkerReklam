import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { services } from "../data/services.js";
import { references } from "../data/references.js";

const connectionString = process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL .env dosyasında bulunamadı.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Veritabanı aktarımı başlıyor...");

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: {
        id: service.id,
        title: service.title,
        description: service.description,
        order: service.order,
        active: service.active,
        images: {
          create: service.images.map((image, index) => ({
            id: image.id,
            src: image.src,
            alt: image.alt,
            order: index + 1,
          })),
        },
      },
    });
  }

  console.log(`${services.length} hizmet kontrol edildi.`);

  for (const reference of references) {
    await prisma.reference.upsert({
      where: { id: reference.id },
      update: {},
      create: {
        id: reference.id,
        name: reference.name,
        logo: reference.logo,
        order: reference.order,
        active: reference.active,
      },
    });
  }

  console.log(`${references.length} referans kontrol edildi.`);

  const [serviceCount, imageCount, referenceCount] = await Promise.all([
    prisma.service.count(),
    prisma.serviceImage.count(),
    prisma.reference.count(),
  ]);

  console.log("Aktarım tamamlandı.");
  console.log(`Hizmetler: ${serviceCount}`);
  console.log(`Görsel alanları: ${imageCount}`);
  console.log(`Referanslar: ${referenceCount}`);
}

main()
  .catch((error) => {
    console.error("Aktarım hatası:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
