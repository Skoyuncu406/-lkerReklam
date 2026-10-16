import HeroBackground from "@/components/hero/HeroBackground";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import AnimatedHeroTitle from "@/components/hero/AnimatedHeroTitle";
export default function Home() {
  return (
    <>
      {/* =====================================
          NAVBAR
      ===================================== */}
      <Navbar />

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
            ÇALIŞMALARIMIZ SECTION
            ŞİMDİLİK PLACEHOLDER
        ===================================== */}
        <section
          id="calismalarimiz"
          className="placeholder-section placeholder-section-alt"
        >
          <div className="placeholder-container">
            <span className="section-eyebrow">02 / PROJELERİMİZ</span>

            <h2 className="placeholder-title">ÇALIŞMALARIMIZ</h2>
          </div>
        </section>

        {/* =====================================
            REFERANSLARIMIZ SECTION
            ŞİMDİLİK PLACEHOLDER
        ===================================== */}
        <section id="referanslarimiz" className="placeholder-section">
          <div className="placeholder-container">
            <span className="section-eyebrow">03 / BİZE GÜVENENLER</span>

            <h2 className="placeholder-title">REFERANSLARIMIZ</h2>
          </div>
        </section>

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
