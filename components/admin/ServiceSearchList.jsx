
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  BriefcaseBusiness,
  ImageIcon,
  CheckCircle2,
  EyeOff,
  Pencil,
} from "lucide-react";

import DeleteServiceButton from "@/components/admin/DeleteServiceButton";

function normalizeText(value) {
  return String(value ?? "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFC")
    .trim();
}

export default function ServiceSearchList({ services }) {
  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    const query = normalizeText(search);

    if (!query) return services;

    return services.filter((service) =>
      normalizeText(service.title).includes(query)
    );
  }, [services, search]);

  return (
    <div className="w-full min-w-0">
      {/* ARAMA ALANI */}
      {services.length > 0 && (
        <div className="mb-6 w-full min-w-0 sm:mb-8">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <label
                htmlFor="service-search"
                className="block text-[11px] font-semibold tracking-[0.16em] text-[#D5A02C] sm:tracking-[0.18em]"
              >
                HİZMET ARA
              </label>

              <p className="mt-2 text-xs leading-5 text-[#AFA9A0]">
                Hizmet başlığına göre anlık arama yapın.
              </p>
            </div>

            <p
              aria-live="polite"
              className="shrink-0 text-xs text-[#AFA9A0]"
            >
              {search.trim()
                ? `${filteredServices.length} / ${services.length} hizmet`
                : `${services.length} hizmet listeleniyor`}
            </p>
          </div>

          <div className="relative mt-4 w-full min-w-0">
            <Search
              size={19}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#D5A02C]"
            />

            <input
              id="service-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Hizmet adı yazın..."
              autoComplete="off"
              spellCheck={false}
              className="block h-14 w-full min-w-0 max-w-full appearance-none rounded-none border border-white/15 bg-[#202020] py-3 pl-12 pr-12 text-base text-[#F4F0E8] outline-none ring-0 transition-colors placeholder:text-[#77736E] focus:border-[#D5A02C] focus:bg-[#202020] focus:outline-none focus:ring-0"
            />

            {search.length > 0 && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Aramayı temizle"
                title="Aramayı temizle"
                className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center text-[#AFA9A0] transition-colors hover:text-[#D5A02C]"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* HİZMET LİSTESİ */}
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
      ) : filteredServices.length === 0 ? (
        <div className="min-w-0 border border-white/10 bg-[#202020] px-4 py-12 text-center sm:px-6 sm:py-16">
          <Search
            size={36}
            className="mx-auto mb-5 text-[#D5A02C]"
          />

          <h2 className="break-words text-lg font-semibold sm:text-xl">
            Aramanızla eşleşen hizmet bulunamadı.
          </h2>

          <p className="mx-auto mt-3 max-w-md break-words text-sm leading-7 text-[#AFA9A0]">
            Farklı bir hizmet adı deneyebilir veya aramayı
            temizleyebilirsiniz.
          </p>

          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-6 inline-flex min-h-11 max-w-full items-center justify-center gap-2 border border-[#D5A02C]/50 px-4 py-3 text-center text-xs font-semibold tracking-wide text-[#D5A02C] transition-colors hover:bg-[#D5A02C] hover:text-[#171717] sm:px-5 sm:tracking-widest"
          >
            <X size={15} className="shrink-0" />
            ARAMAYI TEMİZLE
          </button>
        </div>
      ) : (
        <div className="min-w-0 space-y-4">
          {filteredServices.map((service) => {
            const hasDescription =
              typeof service.description === "string" &&
              service.description.trim().length > 0;

            return (
              <article
                key={service.id}
                className="w-full min-w-0 border border-white/10 bg-[#202020] p-4 transition-colors hover:border-[#D5A02C]/30 sm:p-6 lg:p-7"
              >
                <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                  {/* HİZMET BİLGİLERİ */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="text-xs font-semibold tracking-widest text-[#D5A02C]">
                        {String(service.order).padStart(2, "0")}
                      </span>

                      {service.active ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                          <CheckCircle2
                            size={14}
                            className="shrink-0"
                          />
                          Yayında
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#AFA9A0]">
                          <EyeOff
                            size={14}
                            className="shrink-0"
                          />
                          Pasif
                        </span>
                      )}
                    </div>

                    <h2 className="break-words font-[family-name:var(--font-bebas)] text-2xl tracking-wide sm:text-3xl [overflow-wrap:anywhere]">
                      {service.title}
                    </h2>

                    {hasDescription && (
                      <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-[#AFA9A0] sm:leading-7 [overflow-wrap:anywhere]">
                        {service.description}
                      </p>
                    )}

                    <div className="mt-4 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#AFA9A0] sm:mt-5">
                      <span className="inline-flex min-w-0 items-center gap-2">
                        <ImageIcon
                          size={15}
                          className="shrink-0 text-[#D5A02C]"
                        />
                        <span>{service.imageCount} görsel alanı</span>
                      </span>

                      <span className="break-words">
                        {service.uploadedImageCount} yüklenmiş görsel
                      </span>
                    </div>
                  </div>

                  {/* İŞLEM BUTONLARI */}
                  <div className="flex w-full min-w-0 flex-col gap-2 min-[390px]:flex-row sm:gap-3 lg:w-auto lg:shrink-0">
                    <Link
                      href={`/admin/hizmetler/${service.id}/duzenle`}
                      className="inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 border border-[#D5A02C]/50 px-4 py-3 text-xs font-semibold tracking-wide text-[#D5A02C] transition-colors hover:bg-[#D5A02C] hover:text-[#171717] min-[390px]:flex-1 lg:w-auto lg:flex-none lg:px-5"
                    >
                      <Pencil size={15} className="shrink-0" />
                      <span>DÜZENLE</span>
                    </Link>

                    <div className="w-full min-w-0 min-[390px]:flex-1 lg:w-auto lg:flex-none">
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
    </div>
  );
}
