
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
        setError(
          "Silme işlemi sırasında bir hata oluştu."
        );
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
        className="inline-flex items-center justify-center gap-2 border border-red-400/40 px-5 py-3 text-xs font-semibold tracking-wide text-red-300 transition-colors hover:border-red-400 hover:bg-red-400/10"
      >
        <Trash2 size={15} />
        SİL
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 px-4 py-8"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-service-title"
            className="w-full max-w-md border border-white/15 bg-[#202020] p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center border border-red-400/30 text-red-300">
                <AlertTriangle size={23} />
              </div>

              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                aria-label="Pencereyi kapat"
                className="text-[#AFA9A0] transition-colors hover:text-white disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="delete-service-title"
              className="mt-7 font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-[#F4F0E8]"
            >
              HİZMETİ SİL
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#AFA9A0]">
              <strong className="font-semibold text-[#F4F0E8]">
                {serviceTitle}
              </strong>{" "}
              hizmetini kalıcı olarak silmek istediğinize
              emin misiniz?
            </p>

            <p className="mt-3 text-xs leading-6 text-red-300">
              Bu işlem geri alınamaz. Hizmete bağlı
              görsel kayıtları da silinir.
            </p>

            {error && (
              <p
                role="alert"
                className="mt-5 border border-red-400/30 p-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                className="border border-white/20 px-6 py-3 text-xs font-semibold tracking-widest text-[#F4F0E8] transition-colors hover:border-white/50 disabled:opacity-50"
              >
                VAZGEÇ
              </button>

              <button
                type="button"
                disabled={pending}
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 bg-red-700 px-6 py-3 text-xs font-semibold tracking-widest text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pending ? (
                  <>
                    <LoaderCircle
                      size={15}
                      className="animate-spin"
                    />
                    SİLİNİYOR
                  </>
                ) : (
                  <>
                    <Trash2 size={15} />
                    EVET, SİL
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
