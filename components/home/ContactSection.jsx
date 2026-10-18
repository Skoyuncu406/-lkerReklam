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

/* =========================================
   CONTACT INFORMATION
========================================= */

const PHONE_DISPLAY = "0537 823 59 43";
const PHONE_NUMBER = "905378235943";

const SECOND_PHONE_DISPLAY = "0507 333 20 00";
const SECOND_PHONE_NUMBER = "905073332000";

const EMAIL = "ulkertabelareklam@outlook.com.tr";

const INSTAGRAM_USERNAME = "ulker.tabela.reklam";
const INSTAGRAM_URL =
  `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

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

/* =========================================
   INSTAGRAM ICON
========================================= */

function InstagramIcon({
  size = 16,
  strokeWidth = 1.7,
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="5"
        ry="5"
      />

      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />

      <line
        x1="17.5"
        x2="17.51"
        y1="6.5"
        y2="6.5"
      />
    </svg>
  );
}

/* =========================================
   CONTACT SECTION
========================================= */

export default function ContactSection() {
  const sectionRef = useRef(null);

  /* =========================================
     GSAP SCROLL ANIMATION
  ========================================= */

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
        {/* =====================================
            LEFT CONTENT
        ===================================== */}

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

          {/* =====================================
              ACTION BUTTONS
          ===================================== */}

          <div
            className="contact-actions"
            data-contact-reveal
          >
            <a
              href={`tel:+${PHONE_NUMBER}`}
              className="contact-action contact-action-call"
              aria-label={`${PHONE_DISPLAY} numarasını ara`}
            >
              <Phone
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span>HEMEN ARA</span>

              <ArrowUpRight
                size={16}
                aria-hidden="true"
              />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action contact-action-whatsapp"
              aria-label="WhatsApp üzerinden iletişime geç"
            >
              <MessageCircle
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span>WHATSAPP</span>

              <ArrowUpRight
                size={16}
                aria-hidden="true"
              />
            </a>
          </div>

          {/* =====================================
              CONTACT DETAILS
          ===================================== */}

          <div
            className="contact-details"
            data-contact-reveal
          >
            {/* PHONE NUMBERS */}

            <div className="contact-detail">
              <span className="contact-detail-label">
                TELEFON
              </span>

              <div className="contact-phone-list">
                <a
                  href={`tel:+${PHONE_NUMBER}`}
                  aria-label={`${PHONE_DISPLAY} numarasını ara`}
                >
                  <Phone
                    size={15}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  <span>{PHONE_DISPLAY}</span>
                </a>

                <a
                  href={`tel:+${SECOND_PHONE_NUMBER}`}
                  aria-label={`${SECOND_PHONE_DISPLAY} numarasını ara`}
                >
                  <Phone
                    size={15}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  <span>{SECOND_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

            {/* EMAIL */}

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

            {/* INSTAGRAM */}

            <div className="contact-detail">
              <span className="contact-detail-label">
                INSTAGRAM
              </span>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram: @${INSTAGRAM_USERNAME}`}
              >
                <InstagramIcon
                  size={16}
                  strokeWidth={1.7}
                />

                <span>
                  @{INSTAGRAM_USERNAME}
                </span>

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* ADDRESS */}

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

        {/* =====================================
            RIGHT MAP
        ===================================== */}

        <div
          className="contact-map-side"
          data-contact-reveal
        >
          <div className="contact-map-heading">
            <span>
              <MapPin
                size={15}
                strokeWidth={1.7}
                aria-hidden="true"
              />

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
            <Navigation
              size={18}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <span>YOL TARİFİ AL</span>

            <ArrowUpRight
              size={18}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* =====================================
          ADDITIONAL CONTACT STYLES
      ===================================== */}

      <style jsx global>{`
        .contact-phone-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .contact-phone-list a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
          max-width: 100%;
          text-decoration: none;
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .contact-phone-list a:hover {
          color: #d5a02c;
          transform: translateX(2px);
        }

        .contact-phone-list a svg {
          flex-shrink: 0;
        }

        .contact-detail a {
          overflow-wrap: anywhere;
        }

        @media (max-width: 767px) {
          .contact-phone-list {
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}