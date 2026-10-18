
"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin, X } from "lucide-react";

const message =
  "Merhaba, Ülker Tabela Reklam'dan ücretsiz keşif hizmeti hakkında bilgi almak istiyorum.";

const whatsappUrl =
  `https://wa.me/905378235943?text=${encodeURIComponent(message)}`;

export default function FreeDiscoveryButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp üzerinden ücretsiz keşif hizmeti talep et"
        className={`ulker-discovery ${visible ? "ulker-discovery-visible" : ""}`}
      >
        <span
          className="ulker-discovery-shine"
          aria-hidden="true"
        />

        <span className="ulker-discovery-icon">
          <MapPin size={18} strokeWidth={1.8} />
        </span>

        <span className="ulker-discovery-text">
          ÜCRETSİZ KEŞİF HİZMETİ
        </span>

        <ArrowUpRight
          size={17}
          strokeWidth={1.8}
          className="ulker-discovery-arrow"
          aria-hidden="true"
        />
      </a>

      <style jsx global>{`
        .ulker-discovery {
          position: fixed;
          top: 50%;
          right: 0;
          z-index: 45;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          min-height: 52px;
          padding: 13px 17px;

          color: #171717;
          background: linear-gradient(
            120deg,
            #d5a02c 0%,
            #f3c45c 50%,
            #d5a02c 100%
          );

          border: 1px solid rgba(255, 238, 185, 0.65);
          border-radius: 9px 0 0 9px;

          box-shadow:
            0 5px 25px rgba(213, 160, 44, 0.22);

          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          isolation: isolate;

          opacity: 0;
          transform: translate(105%, -50%);

          transition:
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.6s ease,
            box-shadow 0.3s ease;
        }

        .ulker-discovery-visible {
          opacity: 1;
          transform: translate(0, -50%);

          animation:
            ulker-discovery-pulse 3.2s ease-in-out
            1.2s infinite;
        }

        .ulker-discovery-icon,
        .ulker-discovery-arrow {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .ulker-discovery-text {
          position: relative;
          z-index: 1;

          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.09em;
        }

        .ulker-discovery-shine {
          position: absolute;
          top: -80%;
          left: -65%;
          width: 35%;
          height: 260%;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.65),
            transparent
          );

          transform: rotate(25deg);
          animation: ulker-discovery-shine 5s ease-in-out
            2s infinite;

          pointer-events: none;
        }

        .ulker-discovery:hover {
          color: #171717;
          box-shadow:
            0 8px 32px rgba(213, 160, 44, 0.5);
        }

        .ulker-discovery:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 4px;
        }

        @keyframes ulker-discovery-pulse {
          0%, 100% {
            box-shadow:
              0 5px 25px rgba(213, 160, 44, 0.22);
          }

          50% {
            box-shadow:
              0 0 0 5px rgba(213, 160, 44, 0.1),
              0 5px 32px rgba(213, 160, 44, 0.48);
          }
        }

        @keyframes ulker-discovery-shine {
          0%, 65%, 100% {
            left: -65%;
          }

          85% {
            left: 135%;
          }
        }

        @media (max-width: 767px) {
          .ulker-discovery {
            gap: 5px;
            min-height: 40px;
            padding: 9px 10px;
            border-radius: 7px 0 0 7px;
          }

          .ulker-discovery-text {
            font-size: 8px;
            letter-spacing: 0.015em;
          }

          .ulker-discovery-icon svg {
            width: 14px;
            height: 14px;
          }

          .ulker-discovery-arrow svg {
            width: 13px;
            height: 13px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ulker-discovery {
            transition: none;
          }

          .ulker-discovery-visible,
          .ulker-discovery-shine {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
