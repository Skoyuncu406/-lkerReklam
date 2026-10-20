
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
    <main className="min-h-screen min-w-0 bg-[#171717] text-[#F4F0E8]">
      <div className="min-w-0 w-full">
        <EditServiceForm
          service={{
            id: service.id,
            title: service.title,
            description: service.description,
            order: service.order,
            active: service.active,
          }}
        />
      </div>

      <section className="mx-auto min-w-0 w-full max-w-3xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <ServiceImageManager
          serviceId={service.id}
          images={service.images.map((image) => ({
            id: image.id,
            src: image.src,
            alt: image.alt,
            order: image.order,
          }))}
        />
      </section>
    </main>
  );
}
