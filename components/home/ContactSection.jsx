
"use client";

import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHONE_DISPLAY = "0537 823 59 43";
const PHONE_NUMBER = "905378235943";

const EMAIL = "ulkertabelareklam@outlook.com.tr";

const ADDRESS =
  "Yeşilova Mahallesi Dumlupınar Caddesi No 59/B Küçükçekmece İstanbul Türkiye";

const MAP_QUERY = encodeURIComponent(ADDRESS);

const MAP_EMBED_URL =
  `https://maps.google.com/maps?q=${MAP_QUERY}&output=embed`;

const DIRECTIONS_URL =
  `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, Ülker Tabela Reklam'dan tabela ve reklam hizmetleri hakkında bilgi almak istiyorum."
);

const WHATSAPP_URL =
  `https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const OUTLOOK_URL =
  `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(EMAIL)}`;

export default function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-reveal]",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="iletisim"
      ref={sectionRef}
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="contact-container">
        {/* LEFT CONTENT */}
        <div className="contact-info">
          <div
            className="contact-eyebrow"
            data-contact-reveal
          >
            <span className="contact-eyebrow-line" />
            <span>04 / BİZE ULAŞIN</span>
          </div>

          <h2
            id="contact-title"
            className="contact-title"
            data-contact-reveal
          >
            <span>BİRLİKTE</span>
            <span className="contact-title-gold">
              ÇALIŞALIM.
            </span>
          </h2>

          <p
            className="contact-description"
            data-contact-reveal
          >
            Markanızın görünürlüğünü birlikte güçlendirelim.
            Tabela, reklam ve görsel uygulama projeleriniz
            için bizimle iletişime geçin.
          </p>

          {/* ACTION BUTTONS */}
          <div
            className="contact-actions"
            data-contact-reveal
          >
            <a
              href={`tel:+${PHONE_NUMBER}`}
              className="contact-action contact-action-call"
              aria-label={`${PHONE_DISPLAY} numarasını ara`}
            >
              <Phone size={17} strokeWidth={1.8} />
              <span>HEMEN ARA</span>
              <ArrowUpRight size={16} />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action contact-action-whatsapp"
            >
              <MessageCircle
                size={18}
                strokeWidth={1.8}
              />
              <span>WHATSAPP</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* CONTACT DETAILS */}
          <div
            className="contact-details"
            data-contact-reveal
          >
            <div className="contact-detail">
              <span className="contact-detail-label">
                TELEFON
              </span>

              <a href={`tel:+${PHONE_NUMBER}`}>
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">
                E-POSTA
              </span>

              <a
                href={OUTLOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail
                  size={15}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span>{EMAIL}</span>
              </a>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-label">
                ADRES
              </span>

              <address>
                Yeşilova Mahallesi, Dumlupınar Caddesi
                <br />
                No: 59/B, Küçükçekmece / İstanbul
              </address>
            </div>
          </div>
        </div>

        {/* RIGHT MAP */}
        <div
          className="contact-map-side"
          data-contact-reveal
        >
          <div className="contact-map-heading">
            <span>
              <MapPin size={15} strokeWidth={1.7} />
              KONUMUMUZ
            </span>

            <span>İSTANBUL / TÜRKİYE</span>
          </div>

          <div className="contact-map-frame">
            <iframe
              title="Ülker Tabela Reklam Google Haritalar konumu"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-directions"
          >
            <Navigation size={18} strokeWidth={1.7} />
            <span>YOL TARİFİ AL</span>
            <ArrowUpRight size={18} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </section>
  );
}
