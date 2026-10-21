
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import ServiceSearchList from "@/components/admin/ServiceSearchList";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hizmetler Yönetimi",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminServicesPage() {
  await requireAdmin();

  const services = await prisma.service.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  const serviceList = services.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    order: service.order,
    active: service.active,
    imageCount: service.images.length,
    uploadedImageCount: service.images.filter((image) =>
      Boolean(image.src)
    ).length,
  }));

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#171717] text-[#F4F0E8]">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-10">
        {/* ÜST BAŞLIK */}
        <header className="min-w-0 border-b border-white/10 pb-7 sm:pb-8">
          <Link
            href="/admin"
            className="mb-7 inline-flex max-w-full items-center gap-2 text-xs text-[#AFA9A0] transition-colors hover:text-[#D5A02C] sm:mb-8"
          >
            <ArrowLeft size={15} className="shrink-0" />
            <span>Yönetim Paneline Dön</span>
          </Link>

          <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-[#D5A02C] sm:text-[11px] sm:tracking-[0.2em]">
                ÜLKER TABELA REKLAM
              </p>

              <h1 className="break-words font-[family-name:var(--font-bebas)] text-4xl tracking-wide sm:text-5xl lg:text-6xl">
                HİZMETLER YÖNETİMİ
              </h1>

              <p className="mt-3 break-words text-sm leading-relaxed text-[#AFA9A0]">
                Hizmetlerinizi ve hizmet görsellerinizi yönetin.
              </p>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap lg:w-auto lg:shrink-0">
              <div className="inline-flex min-w-0 items-center justify-center gap-2 border border-[#D5A02C]/40 px-4 py-3 text-xs text-[#D5A02C] min-[420px]:flex-1 lg:flex-none">
                <BriefcaseBusiness
                  size={16}
                  className="shrink-0"
                />
                <span>{services.length} HİZMET</span>
              </div>

              <Link
                href="/admin/hizmetler/yeni"
                className="inline-flex min-w-0 items-center justify-center bg-[#D5A02C] px-4 py-3 text-center text-xs font-semibold tracking-wide text-[#171717] transition-opacity hover:opacity-90 sm:tracking-widest min-[420px]:flex-1 lg:flex-none lg:px-5"
              >
                + YENİ HİZMET EKLE
              </Link>
            </div>
          </div>
        </header>

        {/* ARAMA VE HİZMET LİSTESİ */}
        <section className="mt-7 min-w-0 sm:mt-10">
          <ServiceSearchList services={serviceList} />
        </section>

        {/* ALT BİLGİ */}
        <footer className="mt-12 border-t border-white/10 pt-5 text-center text-[10px] leading-relaxed tracking-wide text-[#77736E] sm:mt-16 sm:pt-6 sm:text-[11px]">
          ÜLKER TABELA REKLAM · HİZMET YÖNETİMİ
        </footer>
      </div>
    </main>
  );
}
