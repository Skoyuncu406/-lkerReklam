
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

import { updateService } from "../../actions";

const initialState = {
  success: false,
  message: "",
};

export default function EditServiceForm({ service }) {
  const router = useRouter();
  const [active, setActive] = useState(service.active);

  const updateAction = updateService.bind(null, service.id);

  const [state, formAction, pending] = useActionState(
    updateAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.replace("/admin/hizmetler");
      router.refresh();
    }
  }, [state.success, router]);

  const inputClass =
    "block w-full min-w-0 max-w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-base text-[#F4F0E8] outline-none transition-colors placeholder:text-[#77736E] focus:border-[#D5A02C] focus:outline-none focus:ring-0 sm:text-sm";

  return (
    <section className="min-w-0 w-full bg-[#171717] text-[#F4F0E8]">
      <div className="mx-auto w-full min-w-0 max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/admin/hizmetler"
          className="mb-8 inline-flex max-w-full items-center gap-2 text-xs text-[#AFA9A0] transition-colors hover:text-[#D5A02C] sm:mb-10"
        >
          <ArrowLeft size={16} className="shrink-0" />
          <span>Hizmetler Yönetimine Dön</span>
        </Link>

        <header className="min-w-0 border-b border-white/10 pb-6 sm:pb-8">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.15em] text-[#D5A02C] sm:tracking-[0.2em]">
            ÜLKER TABELA REKLAM
          </p>

          <h1 className="break-words font-[family-name:var(--font-bebas)] text-4xl tracking-wide sm:text-6xl">
            HİZMET DÜZENLE
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#AFA9A0]">
            Hizmet bilgilerini ve yayın durumunu güncelleyin.
          </p>
        </header>

        <form action={formAction} className="mt-8 min-w-0 space-y-8 sm:mt-10 sm:space-y-9">
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
              defaultValue={service.title}
              className={inputClass}
            />
          </div>

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
              maxLength={5000}
              rows={7}
              defaultValue={service.description ?? ""}
              placeholder="Hizmet açıklaması ekleyebilirsiniz..."
              className={`${inputClass} resize-y leading-7`}
            />
          </div>

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
              required
              defaultValue={service.order}
              className={inputClass}
            />

            <p className="mt-2 text-xs leading-5 text-[#77736E]">
              Küçük sayılar listede önce görüntülenir.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-6">
            <div className="min-w-0">
              <p className="text-sm font-semibold">YAYIN DURUMU</p>

              <p className="mt-1 text-xs leading-5 text-[#AFA9A0]">
                Hizmetin aktif veya pasif olmasını belirleyin.
              </p>
            </div>

            <label className="flex w-fit shrink-0 cursor-pointer items-center gap-3">
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

          {state.message && (
            <div
              role="status"
              className={`flex min-w-0 items-start gap-3 border p-3 text-sm sm:p-4 ${
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

              <p className="min-w-0 break-words">{state.message}</p>
            </div>
          )}

          <div className="flex min-w-0 flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/hizmetler"
              className="inline-flex min-h-12 w-full min-w-0 items-center justify-center border border-white/20 px-4 py-3 text-center text-xs font-semibold tracking-widest text-[#AFA9A0] transition-colors hover:border-white/50 hover:text-white sm:w-auto sm:px-8"
            >
              VAZGEÇ
            </Link>

            <button
              type="submit"
              disabled={pending || state.success}
              className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 bg-[#D5A02C] px-4 py-3 text-center text-xs font-semibold tracking-wider text-[#171717] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8 sm:tracking-widest"
            >
              {pending ? (
                <>
                  <LoaderCircle size={16} className="shrink-0 animate-spin" />
                  <span>GÜNCELLENİYOR</span>
                </>
              ) : (
                <>
                  <Save size={16} className="shrink-0" />
                  <span>DEĞİŞİKLİKLERİ KAYDET</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
