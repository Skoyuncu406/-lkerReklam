import "server-only";
import prisma from "@/lib/prisma";

export async function getPublicServices() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: {
      images: {
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          src: true,
          alt: true,
          order: true,
        },
      },
    },
  });

  return services.map((service, index) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    order: index + 1,
    images: service.images,
  }));
}
