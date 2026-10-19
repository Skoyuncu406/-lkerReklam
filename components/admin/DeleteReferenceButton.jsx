
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { deleteReference } from "@/app/admin/(panel)/referanslar/actions";

export default function DeleteReferenceButton({
  referenceId,
  referenceName,
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleDelete() {
    const confirmed = window.confirm(
      `"${referenceName}" referansını kalıcı olarak silmek istiyor musunuz?`
    );

    if (!confirmed) return;

    setError("");

    startTransition(async () => {
      try {
        await deleteReference(referenceId);
        router.refresh();
      } catch {
        setError("Referans silinemedi. Lütfen tekrar deneyin.");
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="inline-flex cursor-pointer items-center gap-2 border border-red-500/40 px-5 py-3 text-xs font-semibold tracking-wide text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 size={15} />
        {isPending ? "SİLİNİYOR..." : "SİL"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
