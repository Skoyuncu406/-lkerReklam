
"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  Trash2,
  LoaderCircle,
  ImageIcon,
  RefreshCw,
} from "lucide-react";

import {
  uploadServiceImage,
  replaceServiceImage,
  deleteServiceImage,
  moveServiceImage,
} from "@/app/admin/(panel)/hizmetler/image-actions";

export default function ServiceImageManager({ serviceId, images }) {
  const router = useRouter();

  const uploadInputRef = useRef(null);
  const replaceInputRef = useRef(null);

  const [replaceId, setReplaceId] = useState(null);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function resetMessages() {
    setMessage("");
    setError("");
  }

  function runAction(action, successFallback) {
    resetMessages();

    startTransition(async () => {
      try {
        const result = await action();

        if (!result.success) {
          setError(result.message);
          return;
        }

        setMessage(result.message || successFallback);
        router.refresh();
      } catch {
        setError("İşlem sırasında bir hata oluştu.");
      }
    });
  }

  function handleUpload(event) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length || pending) return;

    resetMessages();

    startTransition(async () => {
      let uploaded = 0;
      let failed = 0;

      for (const file of files) {
        const formData = new FormData();
        formData.append("serviceId", serviceId);
        formData.append("image", file);

        try {
          const result = await uploadServiceImage(formData);

          if (result.success) uploaded++;
          else failed++;
        } catch {
          failed++;
        }
      }

      if (uploaded > 0) {
        setMessage(`${uploaded} görsel yüklendi.`);
        router.refresh();
      }

      if (failed > 0) {
        setError(`${failed} görsel yüklenemedi.`);
      }

      if (uploadInputRef.current) {
        uploadInputRef.current.value = "";
      }
    });
  }

 function handleReplaceClick(imageId) {
  if (pending) return;

  resetMessages();
  setReplaceId(imageId);

  if (replaceInputRef.current) {
    replaceInputRef.current.click();
  }
}
  function handleReplace(event) {
    const file = event.target.files?.[0];

    if (!file || !replaceId || pending) return;

    const formData = new FormData();
    formData.append("imageId", replaceId);
    formData.append("image", file);

    runAction(
      () => replaceServiceImage(formData),
      "Görsel değiştirildi."
    );

    if (replaceInputRef.current) {
      replaceInputRef.current.value = "";
    }

    setReplaceId(null);
  }

  function handleDelete(imageId) {
    if (pending) return;

    if (!window.confirm("Bu görsel kalıcı olarak silinsin mi?")) {
      return;
    }

    runAction(
      () => deleteServiceImage(imageId),
      "Görsel silindi."
    );
  }

  function handleMove(imageId, direction) {
    if (pending) return;

    runAction(
      () => moveServiceImage(imageId, direction),
      "Görsel sırası değiştirildi."
    );
  }

  return (
    <section className="mt-10 min-w-0 w-full border-t border-white/10 pt-8 sm:mt-12 sm:pt-10">
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.15em] text-[#D5A02C] sm:tracking-[0.2em]">
            GÖRSEL YÖNETİMİ
          </p>

          <h2 className="break-words font-[family-name:var(--font-bebas)] text-3xl tracking-wide sm:text-4xl">
            HİZMET GÖRSELLERİ
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#AFA9A0]">
            Görselleri yükleyin, değiştirin ve sıralayın.
          </p>
        </div>

        <label
          className={`inline-flex min-h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-2 px-4 py-3 text-center text-xs font-semibold tracking-wider text-[#171717] transition-opacity sm:w-auto sm:px-5 sm:tracking-widest ${
            pending
              ? "pointer-events-none bg-[#D5A02C]/50 opacity-50"
              : "bg-[#D5A02C] hover:opacity-90"
          }`}
        >
          {pending ? (
            <LoaderCircle size={16} className="shrink-0 animate-spin" />
          ) : (
            <ImagePlus size={16} className="shrink-0" />
          )}

          <span>{pending ? "İŞLENİYOR" : "GÖRSEL EKLE"}</span>

          <input
            ref={uploadInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            disabled={pending}
            onChange={handleUpload}
            className="sr-only"
          />
        </label>
      </div>

      {message && (
        <p role="status" className="mt-5 break-words text-sm text-emerald-400">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="mt-5 break-words text-sm text-red-400">
          {error}
        </p>
      )}

      {images.length === 0 ? (
        <div className="mt-8 border border-dashed border-white/15 px-4 py-10 text-center">
          <ImageIcon size={28} className="mx-auto text-[#77736E]" />
          <p className="mt-3 text-sm text-[#AFA9A0]">
            Henüz bu hizmete ait görsel eklenmemiş.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="min-w-0 overflow-hidden border border-white/10 bg-[#252525]"
            >
              <div className="relative aspect-[4/3] min-w-0 bg-[#1D1D1D]">
                {image.src ? (
                  <img
                    src={image.src}
                    alt={image.alt || "Hizmet görseli"}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-[#77736E]">
                    <ImageIcon size={30} />
                    <span className="text-xs">Boş görsel alanı</span>
                  </div>
                )}

                <span className="absolute left-3 top-3 bg-[#171717]/90 px-3 py-1.5 text-xs text-[#D5A02C]">
                  {index + 1}
                </span>
              </div>

              <div className="flex min-w-0 flex-col gap-3 p-3 sm:p-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={pending || index === 0}
                    onClick={() => handleMove(image.id, "up")}
                    title="Önceki sıraya taşı"
                    aria-label="Görseli önceki sıraya taşı"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-[#F4F0E8] transition-colors hover:border-[#D5A02C] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <button
                    type="button"
                    disabled={pending || index === images.length - 1}
                    onClick={() => handleMove(image.id, "down")}
                    title="Sonraki sıraya taşı"
                    aria-label="Görseli sonraki sıraya taşı"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-[#F4F0E8] transition-colors hover:border-[#D5A02C] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowRight size={16} />
                  </button>

                  <span className="ml-auto min-w-0 truncate text-xs text-[#AFA9A0]">
                    Görsel {index + 1}
                  </span>
                </div>

                <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_40px] gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleReplaceClick(image.id)}
                    className="inline-flex min-w-0 min-h-10 items-center justify-center gap-2 border border-[#D5A02C]/40 px-2 py-2 text-xs text-[#D5A02C] transition-colors hover:bg-[#D5A02C]/10 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3"
                  >
                    {pending ? (
                      <LoaderCircle size={14} className="shrink-0 animate-spin" />
                    ) : (
                      <RefreshCw size={14} className="shrink-0" />
                    )}
                    <span className="truncate">
                      {image.src ? "GÖRSELİ DEĞİŞTİR" : "GÖRSELİ DOLDUR"}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleDelete(image.id)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-red-400/30 text-red-300 transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Görseli sil"
                    aria-label={`Görsel ${index + 1} sil`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {replaceId && (
        <div className="mt-6 min-w-0 border border-[#D5A02C]/30 bg-[#202020] p-4 sm:p-5">
          <p className="mb-4 text-sm leading-6 text-[#F4F0E8]">
            Değiştirilecek görsel için yeni dosya seçin.
          </p>

          <input
            ref={replaceInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={pending}
            onChange={handleReplace}
            className="block w-full min-w-0 max-w-full text-xs text-[#AFA9A0] file:mr-2 file:max-w-full file:border-0 file:bg-[#D5A02C] file:px-3 file:py-2 file:text-[#171717] sm:file:mr-4 sm:file:px-4"
          />

          <button
            type="button"
            onClick={() => setReplaceId(null)}
            className="mt-4 min-h-10 text-xs text-[#AFA9A0] transition-colors hover:text-white"
          >
            İptal
          </button>
        </div>
      )}
    </section>
  );
}
