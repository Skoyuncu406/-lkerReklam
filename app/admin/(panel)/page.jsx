
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

  const [serviceCount, imageCount, referenceCount] =
    await Promise.all([
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
    <main className="min-h-screen bg-[#171717] text-[#F4F0E8]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        {/* ÜST ALAN */}
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#D5A02C]">
              ÜLKER TABELA REKLAM
            </p>

            <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.04em] sm:text-6xl">
              YÖNETİM PANELİ
            </h1>

            <p className="mt-2 text-sm text-[#AFA9A0]">
              Hoş geldiniz, {admin.name || admin.email}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 text-xs font-semibold tracking-wide text-[#F4F0E8] transition-colors hover:border-[#D5A02C] hover:text-[#D5A02C]"
            >
              <ExternalLink size={15} />
              SİTEYİ GÖR
            </Link>

            <form
              action={async () => {
                "use server";

                await requireAdmin();

                await signOut({
                  redirectTo: "/admin/login",
                });
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center gap-2 border border-[#D5A02C] px-4 py-3 text-xs font-semibold tracking-wide text-[#D5A02C] transition-colors hover:bg-[#D5A02C] hover:text-[#171717]"
              >
                <LogOut size={15} />
                GÜVENLİ ÇIKIŞ
              </button>
            </form>
          </div>
        </header>

        {/* İSTATİSTİKLER */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <LayoutDashboard size={18} className="text-[#D5A02C]" />
            <h2 className="text-sm font-semibold tracking-[0.12em]">
              GENEL BAKIŞ
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="border border-white/10 bg-[#202020] p-6 transition-colors hover:border-[#D5A02C]/40"
                >
                  <Icon size={21} className="mb-7 text-[#D5A02C]" />

                  <p className="font-[family-name:var(--font-bebas)] text-5xl">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs tracking-wide text-[#AFA9A0]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* YÖNETİM ALANLARI */}
        <section className="mt-14">
          <h2 className="mb-6 text-sm font-semibold tracking-[0.12em]">
            İÇERİK YÖNETİMİ
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Link
              href="/admin/hizmetler"
              className="group flex min-h-48 flex-col justify-between border border-white/10 bg-[#202020] p-7 transition-colors hover:border-[#D5A02C]/50"
            >
              <BriefcaseBusiness
                size={26}
                className="text-[#D5A02C]"
              />

              <div className="mt-8 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
                    HİZMETLERİ YÖNET
                  </h3>
                  <p className="mt-2 text-sm text-[#AFA9A0]">
                    Hizmet ekle, düzenle, sil ve görsellerini yönet.
                  </p>
                </div>

                <ArrowRight
                  size={21}
                  className="shrink-0 text-[#D5A02C] transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>

            <Link
              href="/admin/referanslar"
              className="group flex min-h-48 flex-col justify-between border border-white/10 bg-[#202020] p-7 transition-colors hover:border-[#D5A02C]/50"
            >
              <Building2 size={26} className="text-[#D5A02C]" />

              <div className="mt-8 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
                    REFERANSLARI YÖNET
                  </h3>
                  <p className="mt-2 text-sm text-[#AFA9A0]">
                    Referans firmaları ve logolarını düzenle.
                  </p>
                </div>

                <ArrowRight
                  size={21}
                  className="shrink-0 text-[#D5A02C] transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </section>

        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-[11px] tracking-wide text-[#77736E]">
          ÜLKER TABELA REKLAM · YÖNETİM SİSTEMİ
        </footer>
      </div>
    </main>
  );
}
