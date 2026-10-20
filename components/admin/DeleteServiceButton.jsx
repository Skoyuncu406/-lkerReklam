
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  AlertTriangle,
  LoaderCircle,
  X,
} from "lucide-react";

import { deleteService } from "@/app/admin/(panel)/hizmetler/actions";

export default function DeleteServiceButton({
  serviceId,
  serviceTitle,
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (pending) return;

    setError("");

    startTransition(async () => {
      try {
        const result = await deleteService(serviceId);

        if (!result.success) {
          setError(result.message);
          return;
        }

        setOpen(false);
        router.refresh();
      } catch {
        setError("Silme işlemi sırasında bir hata oluştu.");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className="inline-flex w-full min-w-0 items-center justify-center gap-2 border border-red-400/40 px-4 py-3 text-xs font-semibold tracking-wide text-red-300 transition-colors hover:border-red-400 hover:bg-red-400/10 sm:w-auto sm:px-5"
      >
        <Trash2 size={15} className="shrink-0" />
        <span>SİL</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto overscroll-contain bg-black/80 px-3 py-5 sm:px-4 sm:py-8"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget && !pending) {
              setOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-service-title"
            aria-describedby="delete-service-description"
            className="my-auto w-full min-w-0 max-w-md border border-white/15 bg-[#202020] p-5 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-red-400/30 text-red-300 sm:h-12 sm:w-12">
                <AlertTriangle size={23} />
              </div>

              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                aria-label="Pencereyi kapat"
                className="shrink-0 p-1 text-[#AFA9A0] transition-colors hover:text-white disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="delete-service-title"
              className="mt-6 break-words font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-[#F4F0E8] sm:mt-7 sm:text-4xl"
            >
              HİZMETİ SİL
            </h2>

            <p
              id="delete-service-description"
              className="mt-4 break-words text-sm leading-6 text-[#AFA9A0] sm:leading-7 [overflow-wrap:anywhere]"
            >
              <strong className="font-semibold text-[#F4F0E8]">
                {serviceTitle}
              </strong>{" "}
              hizmetini kalıcı olarak silmek istediğinize emin misiniz?
            </p>

            <p className="mt-3 break-words text-xs leading-6 text-red-300">
              Bu işlem geri alınamaz. Hizmete bağlı görsel kayıtları da
              silinir.
            </p>

            {error && (
              <p
                role="alert"
                className="mt-5 break-words border border-red-400/30 p-3 text-sm leading-relaxed text-red-300 [overflow-wrap:anywhere]"
              >
                {error}
              </p>
            )}

            <div className="mt-7 flex min-w-0 flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                className="inline-flex min-w-0 items-center justify-center border border-white/20 px-4 py-3 text-xs font-semibold tracking-widest text-[#F4F0E8] transition-colors hover:border-white/50 disabled:opacity-50 sm:px-6"
              >
                VAZGEÇ
              </button>

              <button
                type="button"
                disabled={pending}
                onClick={handleDelete}
                className="inline-flex min-w-0 items-center justify-center gap-2 bg-red-700 px-4 py-3 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:tracking-widest"
              >
                {pending ? (
                  <>
                    <LoaderCircle
                      size={15}
                      className="shrink-0 animate-spin"
                    />
                    <span>SİLİNİYOR</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={15} className="shrink-0" />
                    <span>EVET, SİL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
