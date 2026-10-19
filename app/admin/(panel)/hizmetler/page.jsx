
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
    orderBy: [
      { order: "asc" },
      { createdAt: "asc" },
    ],
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#171717] text-[#F4F0E8]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        {/* ÜST BAŞLIK */}
        <header className="border-b border-white/10 pb-8">
          <Link
            href="/admin"
            className="mb-8 inline-flex items-center gap-2 text-xs text-[#AFA9A0] transition-colors hover:text-[#D5A02C]"
          >
            <ArrowLeft size={15} />
            Yönetim Paneline Dön
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#D5A02C]">
                ÜLKER TABELA REKLAM
              </p>

              <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
                HİZMETLER YÖNETİMİ
              </h1>

              <p className="mt-3 text-sm text-[#AFA9A0]">
                Hizmetlerinizi ve hizmet görsellerinizi yönetin.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 border border-[#D5A02C]/40 px-4 py-3 text-xs text-[#D5A02C]">
                <BriefcaseBusiness size={16} />
                {services.length} HİZMET
              </div>

              <Link
                href="/admin/hizmetler/yeni"
                className="inline-flex items-center justify-center bg-[#D5A02C] px-5 py-3 text-xs font-semibold tracking-widest text-[#171717] transition-opacity hover:opacity-90"
              >
                + YENİ HİZMET EKLE
              </Link>
            </div>
          </div>
        </header>

        {/* HİZMET LİSTESİ */}
        <section className="mt-10">
          {services.length === 0 ? (
            <div className="border border-white/10 bg-[#202020] px-6 py-16 text-center">
              <BriefcaseBusiness
                size={36}
                className="mx-auto mb-5 text-[#D5A02C]"
              />

              <h2 className="text-xl font-semibold">
                Henüz hizmet bulunmuyor.
              </h2>

              <p className="mt-3 text-sm text-[#AFA9A0]">
                İlk hizmetinizi oluşturmak için
                &quot;Yeni Hizmet Ekle&quot; butonunu
                kullanabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => {
                const uploadedImages = service.images.filter(
                  (image) => Boolean(image.src)
                ).length;

                const hasDescription =
                  typeof service.description === "string" &&
                  service.description.trim().length > 0;

                return (
                  <article
                    key={service.id}
                    className="border border-white/10 bg-[#202020] p-5 transition-colors hover:border-[#D5A02C]/30 sm:p-7"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1">
                        {/* SIRA VE YAYIN DURUMU */}
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span className="text-xs font-semibold tracking-widest text-[#D5A02C]">
                            {String(service.order).padStart(2, "0")}
                          </span>

                          {service.active ? (
                            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                              <CheckCircle2 size={14} />
                              Yayında
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#AFA9A0]">
                              <EyeOff size={14} />
                              Pasif
                            </span>
                          )}
                        </div>

                        {/* HİZMET BAŞLIĞI */}
                        <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide sm:text-3xl">
                          {service.title}
                        </h2>

                        {/* AÇIKLAMA VARSA GÖSTER */}
                        {hasDescription && (
                          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#AFA9A0]">
                            {service.description}
                          </p>
                        )}

                        {/* GÖRSEL BİLGİLERİ */}
                        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[#AFA9A0]">
                          <span className="inline-flex items-center gap-2">
                            <ImageIcon
                              size={15}
                              className="text-[#D5A02C]"
                            />
                            {service.images.length} görsel alanı
                          </span>

                          <span>
                            {uploadedImages} yüklenmiş görsel
                          </span>
                        </div>
                      </div>

                      {/* İŞLEM BUTONLARI */}
                      <div className="flex shrink-0 items-center gap-3">
                        <Link
                          href={`/admin/hizmetler/${service.id}/duzenle`}
                          className="inline-flex items-center gap-2 border border-[#D5A02C]/50 px-5 py-3 text-xs font-semibold tracking-wide text-[#D5A02C] transition-colors hover:bg-[#D5A02C] hover:text-[#171717]"
                        >
                          <Pencil size={15} />
                          DÜZENLE
                        </Link>

                        <DeleteServiceButton
                          serviceId={service.id}
                          serviceTitle={service.title}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ALT BİLGİ */}
        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-[11px] tracking-wide text-[#77736E]">
          ÜLKER TABELA REKLAM · HİZMET YÖNETİMİ
        </footer>
      </div>
    </main>
  );
}
