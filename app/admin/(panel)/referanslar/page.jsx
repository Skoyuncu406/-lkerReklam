
import Link from "next/link";
import Image from "next/image";
import DeleteReferenceButton from "@/components/admin/DeleteReferenceButton";

import {
  ArrowLeft,
  Building2,
  ImageIcon,
  CheckCircle2,
  EyeOff,
  Pencil,
} from "lucide-react";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Referanslar Yönetimi",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminReferencesPage() {
  await requireAdmin();

  const references = await prisma.reference.findMany({
    orderBy: [
      { order: "asc" },
      { id: "asc" },
    ],
  });

  const activeCount = references.filter(
    (reference) => reference.active
  ).length;

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
                REFERANSLAR YÖNETİMİ
              </h1>

              <p className="mt-3 text-sm text-[#AFA9A0]">
                Referans firmalarınızı ve logolarını yönetin.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 border border-[#D5A02C]/40 px-4 py-3 text-xs text-[#D5A02C]">
                <Building2 size={16} />
                {references.length} REFERANS
              </div>

              <Link
                href="/admin/referanslar/yeni"
                className="inline-flex items-center justify-center bg-[#D5A02C] px-5 py-3 text-xs font-semibold tracking-widest text-[#171717] transition-opacity hover:opacity-90"
              >
                + YENİ REFERANS EKLE
              </Link>
            </div>
          </div>
        </header>

        {/* İSTATİSTİK */}
        <div className="mt-8 flex flex-wrap gap-6 text-xs text-[#AFA9A0]">
          <span>
            Toplam:{" "}
            <strong className="text-[#F4F0E8]">
              {references.length}
            </strong>
          </span>

          <span>
            Yayında:{" "}
            <strong className="text-emerald-400">
              {activeCount}
            </strong>
          </span>

          <span>
            Pasif:{" "}
            <strong className="text-[#F4F0E8]">
              {references.length - activeCount}
            </strong>
          </span>
        </div>

        {/* REFERANS LİSTESİ */}
        <section className="mt-10">
          {references.length === 0 ? (
            <div className="border border-white/10 bg-[#202020] px-6 py-16 text-center">
              <Building2
                size={36}
                className="mx-auto mb-5 text-[#D5A02C]"
              />

              <h2 className="text-xl font-semibold">
                Henüz referans bulunmuyor.
              </h2>

              <p className="mt-3 text-sm text-[#AFA9A0]">
                İlk referansınızı ekleyerek başlayabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {references.map((reference) => (
                <article
                  key={reference.id}
                  className="border border-white/10 bg-[#202020] p-5 transition-colors hover:border-[#D5A02C]/30 sm:p-7"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-5">
                      {/* LOGO */}
                      <div className="relative flex h-20 w-24 shrink-0 items-center justify-center border border-white/10 bg-[#292929]">
                        {reference.logo ? (
                          <Image
                            src={reference.logo}
                            alt={`${reference.name} logosu`}
                            fill
                            sizes="96px"
                            className="object-contain p-3"
                          />
                        ) : (
                          <ImageIcon
                            size={24}
                            className="text-[#77736E]"
                          />
                        )}
                      </div>

                      {/* BİLGİLER */}
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <span className="text-xs font-semibold tracking-widest text-[#D5A02C]">
                            {String(reference.order).padStart(2, "0")}
                          </span>

                          {reference.active ? (
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

                        <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide sm:text-3xl">
                          {reference.name}
                        </h2>

                        <p className="mt-2 text-xs text-[#AFA9A0]">
                          {reference.logo
                            ? "Logo yüklendi"
                            : "Henüz logo yüklenmedi"}
                        </p>
                      </div>
                    </div>

                    {/* İŞLEMLER */}
                    <div className="flex shrink-0 items-center gap-3">
                      <Link
                        href={`/admin/referanslar/${reference.id}/duzenle`}
                        className="inline-flex items-center gap-2 border border-[#D5A02C]/50 px-5 py-3 text-xs font-semibold tracking-wide text-[#D5A02C] transition-colors hover:bg-[#D5A02C] hover:text-[#171717]"
                      >
                        <Pencil size={15} />
                        DÜZENLE
                      </Link>
                      <DeleteReferenceButton
                        referenceId={reference.id}
                        referenceName={reference.name}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-[11px] tracking-wide text-[#77736E]">
          ÜLKER TABELA REKLAM · REFERANS YÖNETİMİ
        </footer>
      </div>
    </main>
  );
}
