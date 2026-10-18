
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { getActiveReferences } from "@/data/references";

function ReferenceItem({ reference }) {
  return (
    <div className="ulker-reference-item">
      {reference.logo ? (
        <div className="ulker-reference-with-logo">
          <div className="ulker-reference-logo">
            <Image
              src={reference.logo}
              alt={`${reference.name} logosu`}
              fill
              sizes="(max-width: 767px) 90px, 130px"
              className="object-contain"
            />
          </div>

          <span className="ulker-reference-name">
            {reference.name}
          </span>
        </div>
      ) : (
        <span className="ulker-reference-name ulker-reference-name-only">
          {reference.name}
        </span>
      )}
    </div>
  );
}

export default function ReferencesSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const references = getActiveReferences();

  return (
    <section
      id="referanslarimiz"
      className="ulker-references-section"
      aria-labelledby="references-title"
    >
      <div className="ulker-references-container">
        {/* HEADER */}

        <div className="ulker-references-heading">
          <div className="ulker-references-eyebrow">
            <span className="ulker-references-line" />
            <span>03 / BİZE GÜVENENLER</span>
          </div>

          <h2
            id="references-title"
            className="ulker-references-title"
          >
            REFERANS<span>LARIMIZ</span>
          </h2>

<p className="ulker-references-description">
  2005 yılından bu yana{" "}
  <strong className="font-semibold text-[#D5A02C]">
    7.000&apos;den fazla referansımızla
  </strong>
  , farklı sektörlerde faaliyet gösteren
  işletmelerin ve markaların görsel
  kimliklerine değer katmanın gururunu yaşıyoruz.
  <br />
  <br />
  Küçük işletmelerden büyük kurumsal markalara
  uzanan geniş müşteri portföyümüzle, her projede
  kaliteli üretimi, güvenilir hizmeti ve uzun
  soluklu iş birliklerini ön planda tutuyoruz.{" "}

</p>
        </div>
      </div>

      {/* CONTINUOUS SLIDER */}

      {references.length > 0 && (
        <div
          className="ulker-references-slider"
          aria-label="Referanslarımız"
        >
          <div className="ulker-references-track">
            <div className="ulker-references-set">
              {references.map((reference) => (
                <ReferenceItem
                  key={reference.id}
                  reference={reference}
                />
              ))}
            </div>

            <div
              className="ulker-references-set"
              aria-hidden="true"
              inert
            >
              {references.map((reference) => (
                <ReferenceItem
                  key={`duplicate-${reference.id}`}
                  reference={reference}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ALL REFERENCES */}

      <div className="ulker-references-container">
        <div className="ulker-references-bottom">
          <button
            type="button"
            className={`ulker-references-toggle ${
              isExpanded ? "is-expanded" : ""
            }`}
            aria-expanded={isExpanded}
            aria-controls="ulker-all-references"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <span>TÜM REFERANSLARIMIZ</span>

            <ChevronDown
              size={21}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </button>

          <div
            id="ulker-all-references"
            className={`ulker-references-dropdown ${
              isExpanded ? "is-open" : ""
            }`}
            inert={!isExpanded}
            aria-hidden={!isExpanded}
          >
            <div className="ulker-references-dropdown-inner">
              <div className="ulker-references-list">
                {references.map((reference, index) => (
                  <div
                    className="ulker-references-list-item"
                    key={reference.id}
                  >
                    <span className="ulker-references-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {reference.logo && (
                      <div className="ulker-references-list-logo">
                        <Image
                          src={reference.logo}
                          alt=""
                          fill
                          sizes="45px"
                          className="object-contain"
                        />
                      </div>
                    )}

                    <span className="ulker-references-list-name">
                      {reference.name}
                    </span>

                    <ArrowUpRight
                      size={17}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="ulker-references-list-icon"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* SECTION */

        .ulker-references-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 70svh;
          padding: 110px 0 115px;
          background: #171717;
          color: #f4f0e8;
          overflow: clip;
        }

        .ulker-references-container {
          width: min(calc(100% - 100px), 1400px);
          margin-inline: auto;
        }

        /* HEADING */

        .ulker-references-heading {
          max-width: 880px;
          margin: 0 auto 70px;
          text-align: center;
        }

        .ulker-references-eyebrow {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          margin-bottom: 23px;
          color: #d5a02c;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.23em;
        }

        .ulker-references-line {
          width: 31px;
          height: 1px;
          background: #d5a02c;
        }

        .ulker-references-title {
          margin: 0;
          font-family: var(--font-bebas), Impact, sans-serif;
          font-size: clamp(58px, 7vw, 110px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0.025em;
        }

        .ulker-references-title span {
          color: #d5a02c;
        }

        .ulker-references-description {
          max-width: 760px;
          margin: 28px auto 0;
          color: #b7b2a9;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: clamp(16px, 1.25vw, 19px);
          line-height: 1.95;
        }

        /* SLIDER */

        .ulker-references-slider {
          position: relative;
          width: 100%;
          padding: 42px 0;
          overflow: hidden;
          border-top: 1px solid rgba(213, 160, 44, 0.25);
          border-bottom: 1px solid rgba(213, 160, 44, 0.25);

          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .ulker-references-track {
          display: flex;
          width: max-content;
          animation: ulker-references-move 36s linear infinite;
          will-change: transform;
        }

        .ulker-references-slider:hover
        .ulker-references-track {
          animation-play-state: paused;
        }

        .ulker-references-set {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
        }

        .ulker-reference-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 290px;
          width: 290px;
          min-height: 112px;
          padding: 0 30px;
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ulker-reference-with-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .ulker-reference-logo {
          position: relative;
          width: 130px;
          height: 65px;
        }

        .ulker-reference-name {
          color: #e9e3d9;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.035em;
          line-height: 1.5;
          transition: color 0.3s ease;
        }

        .ulker-reference-name-only {
          font-size: clamp(19px, 1.8vw, 25px);
          font-weight: 600;
          letter-spacing: 0.015em;
        }

        .ulker-reference-item:hover
        .ulker-reference-name {
          color: #f3c45c;
        }

        @keyframes ulker-references-move {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        /* DROPDOWN */

        .ulker-references-bottom {
          width: 100%;
          padding-top: 55px;
          text-align: center;
        }

        .ulker-references-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          padding: 14px 4px;
          border: none;
          border-bottom: 1px solid #d5a02c;
          background: transparent;
          color: #d5a02c;
          cursor: pointer;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
        }

        .ulker-references-toggle:hover {
          color: #f3c45c;
        }

        .ulker-references-toggle:focus-visible {
          outline: 2px solid #d5a02c;
          outline-offset: 5px;
        }

        .ulker-references-toggle svg {
          transition: transform 0.35s ease;
        }

        .ulker-references-toggle.is-expanded svg {
          transform: rotate(180deg);
        }

        .ulker-references-dropdown {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          visibility: hidden;
          transition:
            grid-template-rows 0.55s ease,
            opacity 0.4s ease,
            visibility 0.4s ease;
        }

        .ulker-references-dropdown.is-open {
          grid-template-rows: 1fr;
          opacity: 1;
          visibility: visible;
        }

        .ulker-references-dropdown-inner {
          min-height: 0;
          overflow: hidden;
        }

        .ulker-references-list {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0 35px;
          padding-top: 55px;
          text-align: left;
        }

        .ulker-references-list-item {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
          min-height: 84px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .ulker-references-number {
          flex-shrink: 0;
          color: #d5a02c;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
        }

        .ulker-references-list-logo {
          position: relative;
          flex: 0 0 45px;
          width: 45px;
          height: 38px;
        }

        .ulker-references-list-name {
          min-width: 0;
          color: #f4f0e8;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .ulker-references-list-icon {
          flex-shrink: 0;
          margin-left: auto;
          color: #d5a02c;
          opacity: 0.55;
        }

        /* TABLET */

        @media (max-width: 1023px) {
          .ulker-references-section {
            padding: 85px 0 95px;
          }

          .ulker-references-container {
            width: calc(100% - 60px);
          }

          .ulker-references-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ulker-reference-item {
            flex-basis: 245px;
            width: 245px;
          }
        }

        /* MOBILE */

        @media (max-width: 767px) {
          .ulker-references-section {
            padding: 70px 0 80px;
          }

          .ulker-references-container {
            width: calc(100% - 36px);
          }

          .ulker-references-heading {
            margin-bottom: 48px;
          }

          .ulker-references-title {
            font-size: clamp(48px, 12vw, 72px);
          }

          .ulker-references-description {
            font-size: 16px;
            line-height: 1.85;
            margin-top: 23px;
          }

          .ulker-references-slider {
            padding: 25px 0;
          }

          .ulker-reference-item {
            flex-basis: 200px;
            width: 200px;
            min-height: 105px;
            padding: 0 20px;
          }

          .ulker-reference-logo {
            width: 90px;
            height: 55px;
          }

          .ulker-reference-name {
            font-size: 13px;
          }

          .ulker-reference-name-only {
            font-size: 19px;
          }

          .ulker-references-track {
            animation-duration: 28s;
          }

          .ulker-references-bottom {
            padding-top: 38px;
          }

          .ulker-references-toggle {
            font-size: 12px;
            letter-spacing: 0.1em;
          }

          .ulker-references-list {
            grid-template-columns: 1fr;
            gap: 0;
            padding-top: 35px;
          }

          .ulker-references-list-item {
            min-height: 72px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ulker-references-track {
            animation: none !important;
          }

          .ulker-references-slider {
            overflow-x: auto;
            mask-image: none;
          }

          .ulker-references-dropdown,
          .ulker-references-toggle svg {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
