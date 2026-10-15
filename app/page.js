import HeroBackground from "@/components/hero/HeroBackground";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="site-main">
        {/* =====================================
            HERO SECTION
        ===================================== */}

        <section
          id="hero"
          aria-labelledby="hero-title"
          className="hero-section"
        >
          {/* GSAP ANIMATED BACKGROUND */}
          <HeroBackground />

          {/* HERO CONTENT */}
          <div className="hero-container">
            <div className="hero-content">
              {/* EYEBROW */}
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" aria-hidden="true" />

                <span>ÜLKER TABELA REKLAM</span>
              </div>

              {/* MAIN HEADING */}
              <h1 id="hero-title" className="hero-title">
                <span>MARKANIZI</span>

                <span className="hero-title-gold">GÖRÜNÜR</span>

                <span>KILIYORUZ.</span>
              </h1>

              {/* DESCRIPTION */}
              <p className="hero-description">
                Yaratıcı reklam uygulamaları, profesyonel tabela çözümleri ve
                güçlü görsel tasarımlarla markanıza değer katıyoruz.
              </p>

              {/* SCROLL LINK */}
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

          {/* SIDE DECORATION */}
          <div className="hero-side-label" aria-hidden="true">
            DESIGN · SIGNAGE · ADVERTISING
          </div>

          {/* BOTTOM LINE */}
          <div className="hero-bottom-line" aria-hidden="true" />
        </section>

        {/* =====================================
            HAKKIMIZDA
        ===================================== */}

        <section id="hakkimizda" className="placeholder-section">
          <div className="placeholder-container">
            <span className="section-eyebrow">01 / BİZ KİMİZ</span>

            <h2 className="placeholder-title">HAKKIMIZDA</h2>
          </div>
        </section>

        {/* =====================================
            ÇALIŞMALARIMIZ
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
            REFERANSLARIMIZ
        ===================================== */}

        <section id="referanslarimiz" className="placeholder-section">
          <div className="placeholder-container">
            <span className="section-eyebrow">03 / BİZE GÜVENENLER</span>

            <h2 className="placeholder-title">REFERANSLARIMIZ</h2>
          </div>
        </section>

        {/* =====================================
            İLETİŞİM
        ===================================== */}

        <section
          id="iletisim"
          className="placeholder-section placeholder-section-alt"
        >
          <div className="placeholder-container">
            <span className="section-eyebrow">04 / BİZE ULAŞIN</span>

            <h2 className="placeholder-title">İLETİŞİM</h2>
          </div>
        </section>
      </main>
    </>
  );
}
