import HeroBackground from "@/components/hero/HeroBackground";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import AnimatedHeroTitle from "@/components/hero/AnimatedHeroTitle";
import ReferencesSection from "@/components/home/ReferencesSection";
import ServicesSection from "@/components/home/ServicesSection";

// PostgreSQL veri sorguları
import { getPublicServices } from "@/lib/public-services";
import { getPublicReferences } from "@/lib/public-references";

// Admin panelinde yapılan değişikliklerin
// ana sayfada güncel olarak görüntülenmesini sağlar.
export const dynamic = "force-dynamic";

export default async function Home() {
  // PostgreSQL üzerinden aktif hizmetleri
  // ve referansları eş zamanlı getir.
  const [services, references] = await Promise.all([
    getPublicServices(),
    getPublicReferences(),
  ]);

  return (
    <>
      {/* =====================================
          NAVBAR

          PostgreSQL üzerinden gelen hizmetler
          masaüstü ve mobil menüde kullanılır.
      ===================================== */}
      <Navbar services={services} />

      {/* =====================================
          MAIN CONTENT
      ===================================== */}
      <main id="main-content" className="site-main">
        {/* =====================================
            HERO SECTION
        ===================================== */}
        <section
          id="hero"
          aria-labelledby="hero-title"
          className="hero-section"
        >
          <HeroBackground />

          <div className="hero-container">
            <div className="hero-content">
              {/* HERO EYEBROW */}
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" aria-hidden="true" />

                <span>ÜLKER TABELA REKLAM</span>
              </div>

              {/* HERO TITLE */}
              <AnimatedHeroTitle />

              {/* HERO DESCRIPTION */}
              <p className="hero-description">
                Yaratıcı reklam uygulamaları, profesyonel tabela çözümleri ve
                güçlü görsel tasarımlarla markanıza değer katıyoruz.
              </p>

              {/* HERO SCROLL */}
              <a
                href="#hakkimizda"
                className="hero-scroll"
                aria-label="Hakkımızda bölümüne git"
              >
                <span className="hero-scroll-line" aria-hidden="true" />

                <span>KEŞFET</span>
              </a>
            </div>
          </div>

          {/* HERO SIDE LABEL */}
          <div className="hero-side-label" aria-hidden="true">
            DESIGN · SIGNAGE · ADVERTISING
          </div>

          {/* HERO BOTTOM LINE */}
          <div className="hero-bottom-line" aria-hidden="true" />
        </section>

        {/* =====================================
            HAKKIMIZDA SECTION
        ===================================== */}
        <AboutSection />

        {/* =====================================
            HİZMETLERİMİZ SECTION

            PostgreSQL + Prisma + Cloudinary

            Admin panelinden yönetilen
            aktif hizmetler ve görseller
        ===================================== */}
        <ServicesSection services={services} />

        {/* =====================================
            REFERANSLARIMIZ SECTION

            PostgreSQL + Prisma

            Admin panelinden yönetilecek
            referanslar ve firma logoları
        ===================================== */}
        <ReferencesSection references={references} />

        {/* =====================================
            İLETİŞİM SECTION
        ===================================== */}
        <ContactSection />
      </main>

      {/* =====================================
          FOOTER
      ===================================== */}
      <Footer />
    </>
  );
}
