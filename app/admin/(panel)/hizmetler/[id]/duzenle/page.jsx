
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

import EditServiceForm from "./EditServiceForm";
import ServiceImageManager from "@/components/admin/ServiceImageManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hizmet Düzenle",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditServicePage({ params }) {
  await requireAdmin();

  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#171717] text-[#F4F0E8]">
      <EditServiceForm
        service={{
          id: service.id,
          title: service.title,
          description: service.description,
          order: service.order,
          active: service.active,
        }}
      />

      <div className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
        <ServiceImageManager
          serviceId={service.id}
          images={service.images.map((image) => ({
            id: image.id,
            src: image.src,
            alt: image.alt,
            order: image.order,
          }))}
        />
      </div>
    </main>
  );
}
