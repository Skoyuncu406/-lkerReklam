
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Images,
  LayoutDashboard,
  LogOut,
  ExternalLink,
} from "lucide-react";

import { requireAdmin } from "@/lib/require-admin";
import prisma from "@/lib/prisma";
import { signOut } from "@/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();

  const [serviceCount, imageCount, referenceCount] = await Promise.all([
    prisma.service.count(),
    prisma.serviceImage.count(),
    prisma.reference.count(),
  ]);

  const stats = [
    {
      label: "Toplam Hizmet",
      value: serviceCount,
      icon: BriefcaseBusiness,
    },
    {
      label: "Görsel Alanları",
      value: imageCount,
      icon: Images,
    },
    {
      label: "Toplam Referans",
      value: referenceCount,
      icon: Building2,
    },
  ];

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#171717] text-[#F4F0E8]">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-10">
        {/* ÜST ALAN */}
        <header className="flex min-w-0 flex-col gap-5 border-b border-white/10 pb-7 sm:gap-6 sm:pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-[#D5A02C] sm:text-[11px] sm:tracking-[0.2em]">
              ÜLKER TABELA REKLAM
            </p>

            <h1 className="break-words font-[family-name:var(--font-bebas)] text-4xl tracking-[0.03em] sm:text-5xl sm:tracking-[0.04em] lg:text-6xl">
              YÖNETİM PANELİ
            </h1>

            <p className="mt-2 break-words text-sm text-[#AFA9A0] [overflow-wrap:anywhere]">
              Hoş geldiniz, {admin.name || admin.email}.
            </p>
          </div>

          <div className="flex w-full min-w-0 flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap lg:w-auto lg:shrink-0">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-0 items-center justify-center gap-2 border border-white/15 px-3 py-3 text-center text-xs font-semibold tracking-wide text-[#F4F0E8] transition-colors hover:border-[#D5A02C] hover:text-[#D5A02C] min-[420px]:flex-1 lg:flex-none lg:px-4"
            >
              <ExternalLink size={15} className="shrink-0" />
              <span>SİTEYİ GÖR</span>
            </Link>

            <form
              action={async () => {
                "use server";

                await requireAdmin();

                await signOut({
                  redirectTo: "/admin/login",
                });
              }}
              className="min-w-0 min-[420px]:flex-1 lg:flex-none"
            >
              <button
                type="submit"
                className="inline-flex w-full min-w-0 items-center justify-center gap-2 border border-[#D5A02C] px-3 py-3 text-center text-xs font-semibold tracking-wide text-[#D5A02C] transition-colors hover:bg-[#D5A02C] hover:text-[#171717] lg:w-auto lg:px-4"
              >
                <LogOut size={15} className="shrink-0" />
                <span>GÜVENLİ ÇIKIŞ</span>
              </button>
            </form>
          </div>
        </header>

        {/* İSTATİSTİKLER */}
        <section className="mt-9 min-w-0 sm:mt-12">
          <div className="mb-5 flex min-w-0 items-center gap-3 sm:mb-6">
            <LayoutDashboard
              size={18}
              className="shrink-0 text-[#D5A02C]"
            />
            <h2 className="min-w-0 break-words text-xs font-semibold tracking-[0.1em] sm:text-sm sm:tracking-[0.12em]">
              GENEL BAKIŞ
            </h2>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="min-w-0 border border-white/10 bg-[#202020] p-5 transition-colors hover:border-[#D5A02C]/40 sm:p-6"
                >
                  <Icon
                    size={21}
                    className="mb-5 text-[#D5A02C] sm:mb-7"
                  />

                  <p className="break-words font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl">
                    {stat.value}
                  </p>

                  <p className="mt-2 break-words text-xs tracking-wide text-[#AFA9A0] [overflow-wrap:anywhere]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* YÖNETİM ALANLARI */}
        <section className="mt-10 min-w-0 sm:mt-14">
          <h2 className="mb-5 break-words text-xs font-semibold tracking-[0.1em] sm:mb-6 sm:text-sm sm:tracking-[0.12em]">
            İÇERİK YÖNETİMİ
          </h2>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <Link
              href="/admin/hizmetler"
              className="group flex min-h-44 min-w-0 flex-col justify-between border border-white/10 bg-[#202020] p-5 transition-colors hover:border-[#D5A02C]/50 sm:min-h-48 sm:p-7"
            >
              <BriefcaseBusiness
                size={26}
                className="shrink-0 text-[#D5A02C]"
              />

              <div className="mt-7 flex min-w-0 items-end justify-between gap-3 sm:mt-8 sm:gap-4">
                <div className="min-w-0">
                  <h3 className="break-words font-[family-name:var(--font-bebas)] text-2xl tracking-wide sm:text-3xl">
                    HİZMETLERİ YÖNET
                  </h3>

                  <p className="mt-2 break-words text-sm leading-relaxed text-[#AFA9A0] [overflow-wrap:anywhere]">
                    Hizmet ekle, düzenle, sil ve görsellerini yönet.
                  </p>
                </div>

                <ArrowRight
                  size={21}
                  className="mb-1 shrink-0 text-[#D5A02C] transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>

            <Link
              href="/admin/referanslar"
              className="group flex min-h-44 min-w-0 flex-col justify-between border border-white/10 bg-[#202020] p-5 transition-colors hover:border-[#D5A02C]/50 sm:min-h-48 sm:p-7"
            >
              <Building2
                size={26}
                className="shrink-0 text-[#D5A02C]"
              />

              <div className="mt-7 flex min-w-0 items-end justify-between gap-3 sm:mt-8 sm:gap-4">
                <div className="min-w-0">
                  <h3 className="break-words font-[family-name:var(--font-bebas)] text-2xl tracking-wide sm:text-3xl">
                    REFERANSLARI YÖNET
                  </h3>

                  <p className="mt-2 break-words text-sm leading-relaxed text-[#AFA9A0] [overflow-wrap:anywhere]">
                    Referans firmaları ve logolarını düzenle.
                  </p>
                </div>

                <ArrowRight
                  size={21}
                  className="mb-1 shrink-0 text-[#D5A02C] transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </section>

        {/* ALT BİLGİ */}
        <footer className="mt-12 border-t border-white/10 pt-5 text-center text-[10px] leading-relaxed tracking-wide text-[#77736E] sm:mt-16 sm:pt-6 sm:text-[11px]">
          ÜLKER TABELA REKLAM · YÖNETİM SİSTEMİ
        </footer>
      </div>
    </main>
  );
}
