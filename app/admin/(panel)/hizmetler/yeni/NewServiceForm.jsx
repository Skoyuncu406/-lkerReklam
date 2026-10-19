
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
    "w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-sm text-[#F4F0E8] outline-none transition-colors placeholder:text-[#77736E] focus:border-[#D5A02C] focus:outline-none focus:ring-0";

  return (
    <main className="min-h-screen bg-[#171717] text-[#F4F0E8]">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <Link
          href="/admin/hizmetler"
          className="mb-10 inline-flex items-center gap-2 text-xs text-[#AFA9A0] transition-colors hover:text-[#D5A02C]"
        >
          <ArrowLeft size={16} />
          Hizmetler Yönetimine Dön
        </Link>

        <header className="border-b border-white/10 pb-8">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#D5A02C]">
            ÜLKER TABELA REKLAM
          </p>

          <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
            YENİ HİZMET EKLE
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#AFA9A0]">
            Yeni bir hizmet oluşturun ve yayın ayarlarını belirleyin.
          </p>
        </header>

        <form action={formAction} className="mt-10 space-y-9">
          <div>
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
              placeholder="Örn. Işıklı Tabela Uygulamaları"
              className={inputClass}
            />
          </div>

          <div>
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
  rows={6}
  placeholder="İsteğe bağlı hizmet açıklaması..."
  className={`${inputClass} resize-y leading-7`}
/>

            <p className="mt-2 text-xs text-[#77736E]">
              Açıklama eklemeden de hizmet oluşturabilirsiniz.
            </p>
          </div>

          <div>
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
              className={inputClass}
            />

            <p className="mt-2 text-xs text-[#77736E]">
              Küçük sayılar listede önce görüntülenir.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 border-y border-white/10 py-6">
            <div>
              <p className="text-sm font-semibold">
                YAYIN DURUMU
              </p>

              <p className="mt-1 text-xs text-[#AFA9A0]">
                Hizmetin aktif olup olmayacağını belirleyin.
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={active}
                onChange={(event) =>
                  setActive(event.target.checked)
                }
                className="h-4 w-4 accent-[#D5A02C]"
              />

              <span className="text-sm text-[#D5A02C]">
                {active ? "Aktif" : "Pasif"}
              </span>
            </label>
          </div>

          {state.message && (
            <div
              role="status"
              className={`flex items-start gap-3 border p-4 text-sm ${
                state.success
                  ? "border-emerald-500/30 text-emerald-400"
                  : "border-red-500/30 text-red-400"
              }`}
            >
              {state.success ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}

              <p>{state.message}</p>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/hizmetler"
              className="inline-flex items-center justify-center border border-white/20 px-8 py-3.5 text-xs font-semibold tracking-widest text-[#AFA9A0] transition-colors hover:border-white/50 hover:text-white"
            >
              VAZGEÇ
            </Link>

            <button
              type="submit"
              disabled={pending || state.success}
              className="inline-flex items-center justify-center gap-2 bg-[#D5A02C] px-8 py-3.5 text-xs font-semibold tracking-widest text-[#171717] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? (
                <>
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                  />
                  KAYDEDİLİYOR
                </>
              ) : (
                <>
                  <Save size={16} />
                  HİZMETİ KAYDET
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
