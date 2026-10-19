import "server-only";
import prisma from "@/lib/prisma";

export async function getPublicReferences() {
  const references = await prisma.reference.findMany({
    where: {
      active: true,
    },
    orderBy: [{ order: "asc" }, { id: "asc" }],
    select: {
      id: true,
      name: true,
      logo: true,
    },
  });

  return references;
}
