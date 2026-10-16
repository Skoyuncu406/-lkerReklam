
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutFlashlight from "./AboutFlashlight";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          y: 65,
          scale: 1.06,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      const elements = contentRef.current.querySelectorAll(
        "[data-about-reveal]"
      );

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        }
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hakkimizda"
      className="about-section"
      aria-labelledby="about-title"
    >
        <AboutFlashlight />
      <div className="about-container">
        {/* IMAGE SIDE */}
        <div className="about-visual">
          <div ref={imageRef} className="about-image-wrap">
            <Image
              src="/images/about/about-workshop.jpg"
              alt="Ülker Tabela Reklam tabela üretimi ve uygulama çalışmaları"
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
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

        {/* CONTENT SIDE */}
        <div ref={contentRef} className="about-content">
          <div className="about-eyebrow" data-about-reveal>
            <span className="about-eyebrow-line" />
            <span>01 / BİZ KİMİZ</span>
          </div>

          <h2
            id="about-title"
            className="about-title"
            data-about-reveal
          >
            <span>FİKİRLERİ</span>
            <span className="about-title-gold">
              GÖRÜNÜR
            </span>
            <span>KILIYORUZ.</span>
          </h2>

          <div
            className="about-divider"
            data-about-reveal
          />

          <p
            className="about-lead"
            data-about-reveal
          >
            Markaların hikâyelerini güçlü ve etkileyici
            görsel çözümlere dönüştürüyoruz.
          </p>

          <p
            className="about-description"
            data-about-reveal
          >
            Ülker Tabela Reklam olarak tasarım, üretim ve
            uygulama süreçlerini bir bütün olarak ele
            alıyoruz. Her projede estetik, işlevsellik
            ve kaliteli işçiliği bir araya getirerek
            markaların görünürlüğünü güçlendirmeyi
            hedefliyoruz.
          </p>

          <Link
            href="#calismalarimiz"
            className="about-link"
            data-about-reveal
          >
            <span>ÇALIŞMALARIMIZI KEŞFEDİN</span>
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
