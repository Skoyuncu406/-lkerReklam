
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   SERVICES
========================================= */

const services = [
  {
    title: "Işıklı & Işıksız Tabelalar",
    description:
      "LED tabela, kutu harf, pleksi ve krom tabela uygulamaları.",
  },
  {
    title: "Cephe Giydirme ve Totemler",
    description:
      "Mega boy totemler, kompozit cephe kaplamaları.",
  },
  {
    title: "Yönlendirme ve İç Mekan Grafikleri",
    description:
      "Ofis içi yönlendirme sistemleri, kapı isimlikleri ve dijital baskı çözümleri.",
  },
  {
    title: "Özel Tasarım Projeler",
    description:
      "Markanızın kimliğine özel, mimari uyumlu yaratıcı konseptler.",
  },
];

/* =========================================
   VALUES
========================================= */

const values = [
  {
    title: "Kalite ve Dayanıklılık",
    description:
      "Dış hava koşullarına dayanıklı, uzun ömürlü ve kaliteli malzemeler kullanırız.",
  },
  {
    title: "Zamanında Teslimat",
    description:
      "Söz verdiğimiz günde, profesyonel ekibimizle montajı tamamlarız.",
  },
  {
    title: "Müşteri Odaklılık",
    description:
      "Sizin hayal ettiğiniz tasarımı gerçeğe dönüştürmek için tasarımdan önce dinler, ortak akılla en iyisini üretiriz.",
  },
];

/* =========================================
   ABOUT SECTION
========================================= */

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  /* =========================================
     SCROLL ANIMATIONS
  ========================================= */

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      /* IMAGE REVEAL */

      gsap.fromTo(
        image,
        {
          opacity: 0,
          y: 45,
          scale: 1.025,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      /* CONTENT REVEAL */

      const elements = gsap.utils.toArray(
        content.querySelectorAll("[data-about-reveal]")
      );

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hakkimizda"
      className="about-section about-section-expanded about-section-premium"
      aria-labelledby="about-title"
    >
      <div className="about-container about-container-expanded">
        {/* =====================================
            LEFT IMAGE
        ===================================== */}

        <div className="about-visual about-visual-expanded">
          <div className="about-visual-sticky">
            <div
              ref={imageRef}
              className="about-image-wrap about-image-expanded"
            >
              <Image
                src="/images/about/about-workshop.jpg"
                alt="Ülker Tabela Reklam tabela üretimi ve uygulama çalışmaları"
                fill
                sizes="(max-width: 1023px) 100vw, 44vw"
                className="about-image"
              />

              <div
                className="about-image-overlay"
                aria-hidden="true"
              />
            </div>

            <div className="about-image-caption">
              <span>ÜLKER TABELA REKLAM</span>
              <span>İSTANBUL / TÜRKİYE</span>
            </div>
          </div>
        </div>

        {/* =====================================
            RIGHT CONTENT
        ===================================== */}

        <div
          ref={contentRef}
          className="about-content about-content-expanded"
        >
          {/* EYEBROW */}

          <div
            className="about-eyebrow"
            data-about-reveal
          >
            <span className="about-eyebrow-line" />
            <span>01 / BİZ KİMİZ</span>
          </div>

          {/* TITLE */}

          <h2
            id="about-title"
            className="about-title"
            data-about-reveal
          >
            <span>MARKANIZIN</span>

            <span className="about-title-gold">
              IŞIĞI VE YÜZÜ
            </span>
          </h2>

          <div
            className="about-divider"
            data-about-reveal
          />

          {/* =====================================
              INTRODUCTION
          ===================================== */}

          <div
            className="about-introduction"
            data-about-reveal
          >
            <p className="about-lead">
              2005 yılında İstanbul&apos;da kurulan
              Ülker Tabela Reklam, işletmelerin ve
              markaların kendilerini en doğru,
              dikkat çekici ve estetik şekilde
              ifade etmelerine olanak tanıyan
              profesyonel tabela ve görsel iletişim
              çözümleri sunmaktadır.
            </p>

            <p className="about-description">
              Kurulduğumuz günden bu yana; küçük
              esnaftan büyük zincir mağazalara,
              kurumsal ofislerden alışveriş
              merkezlerine kadar geniş bir yelpazede
              yüzlerce projeye imza attık. Tasarım
              aşamasından imalata, montajdan satış
              sonrası desteğe kadar tüm süreçleri
              kendi bünyemizde, titizlikle
              yürütüyoruz.
            </p>
          </div>

          {/* =====================================
              SERVICES
          ===================================== */}

          <div
            className="about-detail-group"
            data-about-reveal
          >
            <h3 className="about-detail-title">
              NELER YAPIYORUZ?
            </h3>

            <ul className="about-detail-list">
              {services.map((service) => (
                <li
                  key={service.title}
                  className="about-detail-item"
                >
                  <span
                    className="about-detail-dot"
                    aria-hidden="true"
                  />

                  <p>
                    <strong>{service.title}:</strong>{" "}
                    {service.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================
              VALUES
          ===================================== */}

          <div
            className="about-detail-group"
            data-about-reveal
          >
            <h3 className="about-detail-title">
              VİZYONUMUZ VE DEĞERLERİMİZ
            </h3>

            <ul className="about-detail-list">
              {values.map((value) => (
                <li
                  key={value.title}
                  className="about-detail-item"
                >
                  <span
                    className="about-detail-dot"
                    aria-hidden="true"
                  />

                  <p>
                    <strong>{value.title}:</strong>{" "}
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================
              CLOSING
          ===================================== */}

          <div
            className="about-closing"
            data-about-reveal
          >
            <p className="about-description">
              Markanızın hak ettiği görünürlüğü
              sağlamak ve logonuzu zirveye taşımak
              için buradayız. Tabelanız sadece bir
              isim değil; işinizin kalitesini
              yansıtan ilk adımdır.
            </p>

            <p className="about-closing-title">
              IŞIĞINIZI BİRLİKTE PARLATALIM.
            </p>
          </div>

          {/* =====================================
              SERVICES CTA
          ===================================== */}

          <Link
            href="#hizmetlerimiz"
            className="about-link"
            data-about-reveal
          >
            <span>HİZMETLERİMİZİ KEŞFEDİN</span>

            <ArrowUpRight
              size={19}
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
