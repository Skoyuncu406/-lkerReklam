
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

import { requireAdmin } from "@/lib/require-admin";
import { createReference } from "../actions";

export const metadata = {
  title: "Yeni Referans Ekle",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NewReferencePage() {
  await requireAdmin();

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
            YENİ REFERANS EKLE
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#AFA9A0]">
            Yeni bir firma veya marka referansı oluşturun.
          </p>
        </header>

        <form
          action={createReference}
          encType="multipart/form-data"
          className="space-y-9"
        >
          {/* FİRMA ADI */}
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
              maxLength={150}
              placeholder="Örn. ABC Mimarlık"
              className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 text-base text-[#F4F0E8] outline-none transition-colors placeholder:text-[#77736E] focus:border-[#D5A02C] focus:outline-none focus:ring-0"
            />
          </div>

          {/* LOGO */}
          <div>
            <label
              htmlFor="logo"
              className="mb-3 block text-xs font-semibold tracking-widest text-[#D5A02C]"
            >
              FİRMA LOGOSU
            </label>

            <div className="border border-dashed border-white/20 bg-[#202020] p-7">
              <div className="mb-5 flex items-center gap-3">
                <Building2
                  size={23}
                  className="text-[#D5A02C]"
                />

                <div>
                  <p className="text-sm font-medium">
                    Referans logosu yükleyin
                  </p>

                  <p className="mt-1 text-xs text-[#AFA9A0]">
                    JPG, PNG veya WebP · Maksimum 5 MB
                  </p>
                </div>
              </div>

              <input
                id="logo"
                name="logo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="block w-full text-xs text-[#AFA9A0] file:mr-4 file:cursor-pointer file:border-0 file:bg-[#D5A02C] file:px-4 file:py-3 file:text-xs file:font-semibold file:text-[#171717] hover:file:opacity-90"
              />

              <p className="mt-4 text-xs leading-6 text-[#77736E]">
                Logo yüklemek isteğe bağlıdır. Logo
                eklenmediğinde ana sayfada firma adı
                görüntülenir.
              </p>
            </div>
          </div>

          {/* SIRALAMA */}
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
              defaultValue="0"
              required
              className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 text-base text-[#F4F0E8] outline-none transition-colors focus:border-[#D5A02C] focus:outline-none focus:ring-0"
            />

            <p className="mt-3 text-xs text-[#77736E]">
              Küçük sıra numaraları önce görüntülenir.
            </p>
          </div>

          {/* YAYIN DURUMU */}
          <label className="flex cursor-pointer items-center gap-4 border border-white/10 bg-[#202020] p-5">
            <input
              type="checkbox"
              name="active"
              defaultChecked
              className="h-4 w-4 accent-[#D5A02C]"
            />

            <div>
              <span className="block text-sm font-medium">
                Referansı yayına al
              </span>

              <span className="mt-1 block text-xs text-[#AFA9A0]">
                Aktif referanslar ana sayfada görüntülenir.
              </span>
            </div>
          </label>

          {/* İŞLEMLER */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-end">
            <Link
              href="/admin/referanslar"
              className="inline-flex items-center justify-center border border-white/20 px-7 py-4 text-xs font-semibold tracking-widest text-[#F4F0E8] transition-colors hover:border-[#D5A02C]"
            >
              İPTAL
            </Link>

            <button
              type="submit"
              className="inline-flex cursor-pointer items-center justify-center bg-[#D5A02C] px-8 py-4 text-xs font-semibold tracking-widest text-[#171717] transition-opacity hover:opacity-90"
            >
              REFERANSI KAYDET
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
