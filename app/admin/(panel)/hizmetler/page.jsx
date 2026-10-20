
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ImageIcon,
  CheckCircle2,
  EyeOff,
  Pencil,
} from "lucide-react";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import DeleteServiceButton from "@/components/admin/DeleteServiceButton";

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
                <BriefcaseBusiness size={16} className="shrink-0" />
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

        {/* HİZMET LİSTESİ */}
        <section className="mt-7 min-w-0 sm:mt-10">
          {services.length === 0 ? (
            <div className="min-w-0 border border-white/10 bg-[#202020] px-4 py-12 text-center sm:px-6 sm:py-16">
              <BriefcaseBusiness
                size={36}
                className="mx-auto mb-5 text-[#D5A02C]"
              />

              <h2 className="break-words text-lg font-semibold sm:text-xl">
                Henüz hizmet bulunmuyor.
              </h2>

              <p className="mx-auto mt-3 max-w-md break-words text-sm leading-relaxed text-[#AFA9A0]">
                İlk hizmetinizi oluşturmak için &quot;Yeni Hizmet Ekle&quot;
                butonunu kullanabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="min-w-0 space-y-4">
              {services.map((service) => {
                const uploadedImages = service.images.filter((image) =>
                  Boolean(image.src)
                ).length;

                const hasDescription =
                  typeof service.description === "string" &&
                  service.description.trim().length > 0;

                return (
                  <article
                    key={service.id}
                    className="min-w-0 border border-white/10 bg-[#202020] p-4 transition-colors hover:border-[#D5A02C]/30 sm:p-6 lg:p-7"
                  >
                    <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                      <div className="min-w-0 flex-1">
                        {/* SIRA VE YAYIN DURUMU */}
                        <div className="mb-3 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                          <span className="text-xs font-semibold tracking-widest text-[#D5A02C]">
                            {String(service.order).padStart(2, "0")}
                          </span>

                          {service.active ? (
                            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                              <CheckCircle2 size={14} className="shrink-0" />
                              Yayında
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#AFA9A0]">
                              <EyeOff size={14} className="shrink-0" />
                              Pasif
                            </span>
                          )}
                        </div>

                        {/* HİZMET BAŞLIĞI */}
                        <h2 className="break-words font-[family-name:var(--font-bebas)] text-2xl tracking-wide sm:text-3xl [overflow-wrap:anywhere]">
                          {service.title}
                        </h2>

                        {/* AÇIKLAMA VARSA GÖSTER */}
                        {hasDescription && (
                          <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-[#AFA9A0] sm:leading-7 [overflow-wrap:anywhere]">
                            {service.description}
                          </p>
                        )}

                        {/* GÖRSEL BİLGİLERİ */}
                        <div className="mt-4 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#AFA9A0] sm:mt-5">
                          <span className="inline-flex min-w-0 items-center gap-2">
                            <ImageIcon
                              size={15}
                              className="shrink-0 text-[#D5A02C]"
                            />
                            <span>{service.images.length} görsel alanı</span>
                          </span>

                          <span className="break-words">
                            {uploadedImages} yüklenmiş görsel
                          </span>
                        </div>
                      </div>

                      {/* İŞLEM BUTONLARI */}
                      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3 lg:shrink-0">
                        <Link
                          href={`/admin/hizmetler/${service.id}/duzenle`}
                          className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 border border-[#D5A02C]/50 px-3 py-3 text-xs font-semibold tracking-wide text-[#D5A02C] transition-colors hover:bg-[#D5A02C] hover:text-[#171717] min-[420px]:flex-none sm:px-5"
                        >
                          <Pencil size={15} className="shrink-0" />
                          <span>DÜZENLE</span>
                        </Link>

                        <div className="min-w-0 flex-1 min-[420px]:flex-none">
                          <DeleteServiceButton
                            serviceId={service.id}
                            serviceTitle={service.title}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ALT BİLGİ */}
        <footer className="mt-12 border-t border-white/10 pt-5 text-center text-[10px] leading-relaxed tracking-wide text-[#77736E] sm:mt-16 sm:pt-6 sm:text-[11px]">
          ÜLKER TABELA REKLAM · HİZMET YÖNETİMİ
        </footer>
      </div>
    </main>
  );
}
