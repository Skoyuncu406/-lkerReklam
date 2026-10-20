
"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { createService } from "../actions";

const initialState = {
  success: false,
  message: "",
};

export default function NewServiceForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    createService,
    initialState
  );

  const [active, setActive] = useState(true);

  useEffect(() => {
    if (state.success) {
      router.replace("/admin/hizmetler");
      router.refresh();
    }
  }, [state.success, router]);

  const inputClass =
    "block w-full min-w-0 max-w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-base text-[#F4F0E8] outline-none transition-colors placeholder:text-[#77736E] focus:border-[#D5A02C] focus:outline-none focus:ring-0 sm:text-sm";

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#171717] text-[#F4F0E8]">
      <div className="mx-auto w-full min-w-0 max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        {/* GERİ DÖN */}
        <Link
          href="/admin/hizmetler"
          className="mb-8 inline-flex max-w-full items-center gap-2 text-xs text-[#AFA9A0] transition-colors hover:text-[#D5A02C] sm:mb-10"
        >
          <ArrowLeft size={16} className="shrink-0" />
          <span>Hizmetler Yönetimine Dön</span>
        </Link>

        {/* SAYFA BAŞLIĞI */}
        <header className="min-w-0 border-b border-white/10 pb-6 sm:pb-8">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-[#D5A02C] sm:text-[11px] sm:tracking-[0.2em]">
            ÜLKER TABELA REKLAM
          </p>

          <h1 className="break-words font-[family-name:var(--font-bebas)] text-4xl tracking-wide sm:text-5xl lg:text-6xl">
            YENİ HİZMET EKLE
          </h1>

          <p className="mt-3 break-words text-sm leading-6 text-[#AFA9A0] sm:leading-7">
            Yeni bir hizmet oluşturun ve yayın ayarlarını belirleyin.
          </p>
        </header>

        {/* HİZMET FORMU */}
        <form action={formAction} className="mt-7 min-w-0 space-y-8 sm:mt-10 sm:space-y-9">
          {/* HİZMET BAŞLIĞI */}
          <div className="min-w-0">
            <label
              htmlFor="title"
              className="block text-xs font-semibold tracking-wide text-[#D5A02C]"
            >
              HİZMET BAŞLIĞI
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              minLength={3}
              maxLength={150}
              autoComplete="off"
              placeholder="Örn. Işıklı Tabela Uygulamaları"
              className={inputClass}
            />
          </div>

          {/* HİZMET AÇIKLAMASI */}
          <div className="min-w-0">
            <label
              htmlFor="description"
              className="block text-xs font-semibold tracking-wide text-[#D5A02C]"
            >
              HİZMET AÇIKLAMASI
              <span className="ml-2 text-[11px] font-normal tracking-normal text-[#AFA9A0]">
                (İsteğe bağlı)
              </span>
            </label>

            <textarea
              id="description"
              name="description"
              required={false}
              maxLength={5000}
              rows={5}
              placeholder="İsteğe bağlı hizmet açıklaması..."
              className={`${inputClass} resize-y leading-7`}
            />

            <p className="mt-2 break-words text-xs leading-relaxed text-[#77736E]">
              Açıklama eklemeden de hizmet oluşturabilirsiniz.
            </p>
          </div>

          {/* GÖRÜNTÜLEME SIRASI */}
          <div className="min-w-0">
            <label
              htmlFor="order"
              className="block text-xs font-semibold tracking-wide text-[#D5A02C]"
            >
              GÖRÜNTÜLEME SIRASI
            </label>

            <input
              id="order"
              name="order"
              type="number"
              min={0}
              max={9999}
              step={1}
              defaultValue={0}
              required
              inputMode="numeric"
              className={inputClass}
            />

            <p className="mt-2 break-words text-xs leading-relaxed text-[#77736E]">
              Küçük sayılar listede önce görüntülenir.
            </p>
          </div>

          {/* YAYIN DURUMU */}
          <div className="flex min-w-0 flex-col gap-4 border-y border-white/10 py-5 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between sm:py-6">
            <div className="min-w-0">
              <p className="text-sm font-semibold">YAYIN DURUMU</p>

              <p className="mt-1 break-words text-xs leading-relaxed text-[#AFA9A0]">
                Hizmetin aktif olup olmayacağını belirleyin.
              </p>
            </div>

            <label className="inline-flex w-fit max-w-full shrink-0 cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={active}
                onChange={(event) => setActive(event.target.checked)}
                className="h-4 w-4 shrink-0 accent-[#D5A02C]"
              />

              <span className="text-sm text-[#D5A02C]">
                {active ? "Aktif" : "Pasif"}
              </span>
            </label>
          </div>

          {/* GERİ BİLDİRİM */}
          {state.message && (
            <div
              role={state.success ? "status" : "alert"}
              className={`flex min-w-0 items-start gap-3 border p-3 text-sm leading-relaxed sm:p-4 ${
                state.success
                  ? "border-emerald-500/30 text-emerald-400"
                  : "border-red-500/30 text-red-400"
              }`}
            >
              {state.success ? (
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              ) : (
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
              )}

              <p className="min-w-0 break-words [overflow-wrap:anywhere]">
                {state.message}
              </p>
            </div>
          )}

          {/* FORM BUTONLARI */}
          <div className="flex min-w-0 flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/hizmetler"
              className="inline-flex min-w-0 items-center justify-center border border-white/20 px-5 py-3.5 text-xs font-semibold tracking-widest text-[#AFA9A0] transition-colors hover:border-white/50 hover:text-white sm:px-8"
            >
              VAZGEÇ
            </Link>

            <button
              type="submit"
              disabled={pending || state.success}
              className="inline-flex min-w-0 items-center justify-center gap-2 bg-[#D5A02C] px-5 py-3.5 text-xs font-semibold tracking-wide text-[#171717] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:tracking-widest"
            >
              {pending ? (
                <>
                  <LoaderCircle
                    size={16}
                    className="shrink-0 animate-spin"
                  />
                  <span>KAYDEDİLİYOR</span>
                </>
              ) : (
                <>
                  <Save size={16} className="shrink-0" />
                  <span>HİZMETİ KAYDET</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
