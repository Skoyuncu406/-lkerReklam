
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { updateReference } from "../../actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Referans Düzenle",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditReferencePage({ params }) {
  await requireAdmin();

  const { id } = await params;

  const reference = await prisma.reference.findUnique({
    where: { id },
  });

  if (!reference) {
    notFound();
  }

  const updateAction = updateReference.bind(null, reference.id);

  return (
    <main className="min-h-screen bg-[#171717] text-[#F4F0E8]">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <Link
          href="/admin/referanslar"
          className="mb-10 inline-flex items-center gap-2 text-xs text-[#AFA9A0] transition-colors hover:text-[#D5A02C]"
        >
          <ArrowLeft size={15} />
          Referans Yönetimine Dön
        </Link>

        <header className="mb-10 border-b border-white/10 pb-8">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#D5A02C]">
            ÜLKER TABELA REKLAM
          </p>

          <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
            REFERANS DÜZENLE
          </h1>

          <p className="mt-3 text-sm text-[#AFA9A0]">
            {reference.name}
          </p>
        </header>

        <form action={updateAction} className="space-y-9">
          <div>
            <label
              htmlFor="name"
              className="mb-3 block text-xs font-semibold tracking-widest text-[#D5A02C]"
            >
              FİRMA / MARKA ADI *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={reference.name ?? ""}
              required
              maxLength={150}
              className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 text-base text-[#F4F0E8] outline-none transition-colors focus:border-[#D5A02C] focus:ring-0"
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-[#D5A02C]">
              FİRMA LOGOSU
            </p>

            <div className="border border-dashed border-white/20 bg-[#202020] p-7">
              {reference.logo ? (
                <div className="mb-6">
                  <p className="mb-3 text-xs text-[#AFA9A0]">
                    Mevcut logo
                  </p>

                  <div className="relative h-32 w-48 border border-white/10 bg-[#292929]">
                    <Image
                      src={reference.logo}
                      alt={`${reference.name} logosu`}
                      fill
                      sizes="192px"
                      className="object-contain p-4"
                    />
                  </div>

                  <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-[#AFA9A0]">
                    <input
                      type="checkbox"
                      name="removeLogo"
                      className="h-4 w-4 accent-[#D5A02C]"
                    />
                    Mevcut logoyu kaldır
                  </label>
                </div>
              ) : (
                <div className="mb-5 flex items-center gap-3">
                  <Building2 size={23} className="text-[#D5A02C]" />
                  <p className="text-sm text-[#AFA9A0]">
                    Bu referans için henüz logo yüklenmemiş.
                  </p>
                </div>
              )}

              <label
                htmlFor="logo"
                className="mb-3 block text-xs font-semibold text-[#F4F0E8]"
              >
                {reference.logo ? "Yeni logo yükle" : "Logo yükle"}
              </label>

              <input
                id="logo"
                name="logo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="block w-full text-xs text-[#AFA9A0] file:mr-4 file:cursor-pointer file:border-0 file:bg-[#D5A02C] file:px-4 file:py-3 file:text-xs file:font-semibold file:text-[#171717]"
              />

              <p className="mt-4 text-xs leading-6 text-[#77736E]">
                JPG, PNG veya WebP · Maksimum 5 MB.
                Yeni logo seçerseniz mevcut logo değiştirilir.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="order"
              className="mb-3 block text-xs font-semibold tracking-widest text-[#D5A02C]"
            >
              GÖRÜNTÜLEME SIRASI
            </label>

            <input
              id="order"
              name="order"
              type="number"
              min="0"
              step="1"
              defaultValue={reference.order}
              required
              className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 text-base text-[#F4F0E8] outline-none focus:border-[#D5A02C] focus:ring-0"
            />

            <p className="mt-3 text-xs text-[#77736E]">
              Küçük sıra numaraları önce görüntülenir.
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-4 border border-white/10 bg-[#202020] p-5">
            <input
              type="checkbox"
              name="active"
              defaultChecked={reference.active}
              className="h-4 w-4 accent-[#D5A02C]"
            />

            <div>
              <span className="block text-sm font-medium">
                Referansı yayına al
              </span>

              <span className="mt-1 block text-xs text-[#AFA9A0]">
                Pasif referanslar ana sayfada gösterilmez.
              </span>
            </div>
          </label>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-end">
            <Link
              href="/admin/referanslar"
              className="inline-flex items-center justify-center border border-white/20 px-7 py-4 text-xs font-semibold tracking-widest text-[#F4F0E8] hover:border-[#D5A02C]"
            >
              İPTAL
            </Link>

            <button
              type="submit"
              className="cursor-pointer bg-[#D5A02C] px-8 py-4 text-xs font-semibold tracking-widest text-[#171717] hover:opacity-90"
            >
              DEĞİŞİKLİKLERİ KAYDET
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
