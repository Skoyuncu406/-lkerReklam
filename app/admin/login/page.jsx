
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    let redirecting = false;

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (!result || result.error || result.ok === false) {
        setError("E-posta adresi veya şifre hatalı.");
        return;
      }

      // Oturum oluşturulduktan sonra tam sayfa yönlendirme.
      // Böylece Next.js istemci yönlendirme önbelleği kullanılmaz.
      redirecting = true;
      window.location.replace("/admin");
    } catch (err) {
      console.error("Admin giriş hatası:", err);

      setError(
        "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyiniz."
      );
    } finally {
      if (!redirecting) {
        setLoading(false);
      }
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171717] px-5 py-12 text-[#F4F0E8]">
      <div className="w-full max-w-[420px]">
        <div className="mb-12 text-center">
          <div className="mb-7 flex items-center justify-center gap-3">
            <span className="h-9 w-[3px] bg-[#D5A02C]" />

            <span className="font-['Bebas_Neue'] text-[29px] tracking-[0.09em]">
              ÜLKER TABELA REKLAM
            </span>
          </div>

          <div className="mx-auto mb-9 h-px w-16 bg-[#D5A02C]/60" />

          <h1 className="font-['Bebas_Neue'] text-5xl tracking-[0.06em]">
            YÖNETİM PANELİ
          </h1>

          <p className="mt-3 text-sm text-[#AFA9A0]">
            Yetkili kullanıcı girişi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-3 block text-[11px] font-semibold tracking-[0.17em] text-[#D5A02C]"
            >
              E-POSTA ADRESİ
            </label>

            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="w-full border-0 border-b border-[#514C45] bg-transparent px-0 py-3 text-sm text-[#F4F0E8] outline-none transition-colors placeholder:text-[#77736E] focus:border-[#D5A02C] focus:outline-none focus:ring-0 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-3 block text-[11px] font-semibold tracking-[0.17em] text-[#D5A02C]"
            >
              ŞİFRE
            </label>

            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifreniz"
                className="w-full border-0 border-b border-[#514C45] bg-transparent px-0 py-3 pr-11 text-sm text-[#F4F0E8] outline-none transition-colors placeholder:text-[#77736E] focus:border-[#D5A02C] focus:outline-none focus:ring-0 disabled:opacity-60"
              />

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                aria-label={
                  showPassword
                    ? "Şifreyi gizle"
                    : "Şifreyi göster"
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#AFA9A0] transition-colors hover:text-[#D5A02C] disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 bg-[#D5A02C] px-5 py-4 text-xs font-bold tracking-[0.16em] text-[#171717] transition-colors hover:bg-[#F3C45C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LockKeyhole size={16} />

            {loading
              ? "GİRİŞ YAPILIYOR..."
              : "GİRİŞ YAP"}

            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="mt-10 text-center text-[11px] tracking-[0.05em] text-[#77736E]">
          ÜLKER TABELA REKLAM · GÜVENLİ YÖNETİM ERİŞİMİ
        </p>
      </div>
    </main>
  );
}
