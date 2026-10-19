
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Images,
  Maximize2,
  X,
} from "lucide-react";

/* =========================================
   SERVICE GALLERY
========================================= */

function ServiceGallery({ service }) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [columns, setColumns] = useState(5);

  const touchStartX = useRef(null);
  const galleryRef = useRef(null);

  const images = service.images || [];
  const viewableImages = images.filter((image) => Boolean(image.src));

  const activeImage =
    lightboxIndex === null
      ? null
      : viewableImages[lightboxIndex];

  // Responsive column count
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth <= 767) {
        setColumns(2);
      } else if (window.innerWidth <= 1023) {
        setColumns(3);
      } else {
        setColumns(5);
      }
    };

    updateColumns();

    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const hasMoreImages = images.length > columns;

  const visibleImages = expanded
    ? images
    : images.slice(0, columns);

  // Lightbox keyboard and scroll locking
  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }

      if (event.key === "ArrowRight" && viewableImages.length > 1) {
        setLightboxIndex(
          (current) => (current + 1) % viewableImages.length
        );
      }

      if (event.key === "ArrowLeft" && viewableImages.length > 1) {
        setLightboxIndex(
          (current) =>
            (current - 1 + viewableImages.length) %
            viewableImages.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, viewableImages.length]);

  const openLightbox = (image) => {
    const index = viewableImages.findIndex(
      (item) => item.id === image.id
    );

    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const toggleGallery = () => {
    setExpanded((current) => !current);
  };

  return (
    <article
      id={`hizmet-${service.id}`}
      className="ulker-service-block"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* SERVICE HEADER */}

      <div className="ulker-service-header">
        <div className="ulker-service-heading">
          <span className="ulker-service-index">
            {String(service.order).padStart(2, "0")}
          </span>

          <div>
            <h3 className="ulker-service-title" lang="tr">
              {service.title?.toLocaleUpperCase("tr-TR")}
            </h3>

            {service.description && (
              <p className="ulker-service-description">
                {service.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* RESPONSIVE IMAGE GRID */}

      {images.length > 0 ? (
        <>
          <div
            ref={galleryRef}
            className="ulker-service-gallery"
            aria-label={`${service.title} görselleri`}
            role="region"
          >
            {visibleImages.map((image, index) => (
              <div
                key={image.id}
                className="ulker-service-slide"
              >
                <div className="ulker-service-image-wrap">
                  {image.src ? (
                    <Image
                      src={image.src}
                      alt={
                        image.alt ||
                        `${service.title} görsel ${index + 1}`
                      }
                      fill
                      sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw"
                      className="ulker-service-image"
                    />
                  ) : (
                    <div className="ulker-service-placeholder">
                      <ImageIcon
                        size={30}
                        strokeWidth={1}
                        aria-hidden="true"
                      />

                      <span>
                        GÖRSEL{" "}
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}

                  <div
                    className="ulker-service-image-overlay"
                    aria-hidden="true"
                  />

                  {image.src && (
                    <button
                      type="button"
                      className="ulker-service-expand"
                      aria-label={`${service.title}: ${index + 1}. görseli büyüt`}
                      onClick={() => openLightbox(image)}
                    >
                      <Maximize2
                        size={19}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  <span className="ulker-service-image-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* SHOW MORE / SHOW LESS */}

          {hasMoreImages && (
            <div className="ulker-service-more-wrap">
              <button
                type="button"
                className={`ulker-service-more-button ${
                  expanded ? "is-expanded" : ""
                }`}
                aria-expanded={expanded}
                onClick={toggleGallery}
              >
                <span className="ulker-service-more-icon">
                  {expanded ? (
                    <ChevronUp size={20} strokeWidth={2} />
                  ) : (
                    <Images size={20} strokeWidth={1.8} />
                  )}
                </span>

                <span className="ulker-service-more-label">
                  {expanded
                    ? "DAHA AZ GÖSTER"
                    : "DAHA FAZLA GÖRSEL İÇİN TIKLAYINIZ"}
                </span>

                {expanded ? (
                  <ChevronUp
                    size={19}
                    strokeWidth={2}
                    className="ulker-service-more-chevron"
                  />
                ) : (
                  <ChevronDown
                    size={19}
                    strokeWidth={2}
                    className="ulker-service-more-chevron"
                  />
                )}
              </button>

              {!expanded && (
                <p className="ulker-service-more-count">
                  +{images.length - columns} görsel daha
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="ulker-service-empty">
          Bu hizmet için henüz görsel eklenmedi.
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX */}

      {activeImage &&
        createPortal(
          <div
            className="ulker-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${service.title} görsel görüntüleyici`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setLightboxIndex(null);
              }
            }}
            onTouchStart={(event) => {
              touchStartX.current =
                event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const startX = touchStartX.current;
              const endX =
                event.changedTouches[0]?.clientX;

              touchStartX.current = null;

              if (
                startX === null ||
                endX == null ||
                viewableImages.length < 2
              ) {
                return;
              }

              const delta = endX - startX;

              if (Math.abs(delta) < 55) return;

              setLightboxIndex((current) =>
                delta < 0
                  ? (current + 1) % viewableImages.length
                  : (current - 1 + viewableImages.length) %
                    viewableImages.length
              );
            }}
          >
            <div className="ulker-lightbox-top">
              <span>
                {service.title} — {lightboxIndex + 1} /{" "}
                {viewableImages.length}
              </span>

              <button
                type="button"
                className="ulker-lightbox-close"
                aria-label="Görseli kapat"
                onClick={() => setLightboxIndex(null)}
                autoFocus
              >
                <X size={25} strokeWidth={1.6} />
              </button>
            </div>

            <div className="ulker-lightbox-image-wrap">
              <Image
                src={activeImage.src}
                alt={
                  activeImage.alt ||
                  `${service.title} görsel ${lightboxIndex + 1}`
                }
                fill
                sizes="100vw"
                className="ulker-lightbox-image"
              />
            </div>

            {viewableImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="ulker-lightbox-nav ulker-lightbox-prev"
                  aria-label="Önceki görsel"
                  onClick={() =>
                    setLightboxIndex(
                      (i) =>
                        (i - 1 + viewableImages.length) %
                        viewableImages.length
                    )
                  }
                >
                  <ArrowLeft size={25} />
                </button>

                <button
                  type="button"
                  className="ulker-lightbox-nav ulker-lightbox-next"
                  aria-label="Sonraki görsel"
                  onClick={() =>
                    setLightboxIndex(
                      (i) => (i + 1) % viewableImages.length
                    )
                  }
                >
                  <ArrowRight size={25} />
                </button>
              </>
            )}
          </div>,
          document.body
        )}
    </article>
  );
}

/* =========================================
   SERVICES SECTION
========================================= */

export default function ServicesSection({ services = [] }) {
  return (
    <section
      id="hizmetlerimiz"
      className="ulker-services-section"
      aria-labelledby="ulker-services-title"
      style={{
        backgroundColor: "#171717",
        color: "#F4F0E8",
      }}
    >
      <div className="ulker-services-container">
        <header className="ulker-services-intro">
          <div className="ulker-services-eyebrow">
            <span className="ulker-services-eyebrow-line" />
            <span>02 / NELER YAPIYORUZ</span>
          </div>

          <h2
            id="ulker-services-title"
            className="ulker-services-main-title"
          >
            HİZMET<span>LERİMİZ</span>
          </h2>

          <p className="ulker-services-intro-text">
            Tasarımdan üretime, uygulamadan montaja kadar
            markanızın görünürlüğünü güçlendiren profesyonel
            reklam ve tabela çözümleri sunuyoruz.
          </p>
        </header>

        <div className="ulker-services-list">
          {services.map((service) => (
            <ServiceGallery
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* SECTION */

        .ulker-services-section {
          position: relative;
          width: 100%;
          padding: 110px 0 125px;
          background-color: #171717;
          color: #f4f0e8;
          overflow: clip;
        }

        .ulker-services-container {
          width: min(calc(100% - 100px), 1500px);
          margin: 0 auto;
        }

        /* INTRO */

        .ulker-services-intro {
          max-width: 850px;
          margin-bottom: 90px;
        }

        .ulker-services-eyebrow {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 23px;
          color: #d5a02c;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
        }

        .ulker-services-eyebrow-line {
          width: 34px;
          height: 1px;
          background: #d5a02c;
        }

        .ulker-services-main-title {
          margin: 0;
          color: #f4f0e8;
          font-family: var(--font-bebas), Impact, sans-serif;
          font-size: clamp(60px, 7vw, 110px);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: 0.025em;
        }

        .ulker-services-main-title span {
          color: #d5a02c;
        }

        .ulker-services-intro-text {
          max-width: 700px;
          margin-top: 30px;
          color: #bdb7ad;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: clamp(16px, 1.25vw, 19px);
          line-height: 1.9;
        }

        /* SERVICE BLOCKS */

        .ulker-services-list {
          display: flex;
          flex-direction: column;
          gap: 100px;
        }

        .ulker-service-block {
          position: relative;
          min-width: 0;
        }

        .ulker-service-block:not(:last-child)::after {
          content: "";
          position: absolute;
          bottom: -50px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(213, 160, 44, 0.32),
            transparent
          );
        }

        .ulker-service-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-bottom: 30px;
        }

        .ulker-service-heading {
          display: flex;
          align-items: flex-start;
          gap: 22px;
          min-width: 0;
        }

        .ulker-service-index {
          flex-shrink: 0;
          padding-top: 10px;
          color: #d5a02c;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .ulker-service-title {
          margin: 0;
          color: #f4f0e8;
          font-family: var(--font-bebas), Impact, sans-serif;
          font-size: clamp(35px, 3.3vw, 53px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: 0.025em;
        }

        .ulker-service-description {
          max-width: 760px;
          margin-top: 12px;
          color: #bdb7ad;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 15px;
          line-height: 1.85;
        }

        /* RESPONSIVE IMAGE GRID */

        .ulker-service-gallery {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          align-items: start;
          gap: 14px;
          width: 100%;
        }

        .ulker-service-slide {
          min-width: 0;
        }

        .ulker-service-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: #252525;
          border: 1px solid rgba(244, 240, 232, 0.72);
          transition:
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .ulker-service-slide:hover .ulker-service-image-wrap {
          border-color: #d5a02c;
          box-shadow:
            0 0 0 1px rgba(213, 160, 44, 0.15),
            0 12px 30px rgba(0, 0, 0, 0.3);
        }

        .ulker-service-image {
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .ulker-service-slide:hover .ulker-service-image {
          transform: scale(1.055);
        }

        .ulker-service-image-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.36),
            transparent 45%
          );
        }

        .ulker-service-image-number {
          position: absolute;
          bottom: 15px;
          left: 16px;
          color: #f4f0e8;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
        }

        /* SHOW MORE BUTTON */

        .ulker-service-more-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-top: 34px;
        }

        .ulker-service-more-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          min-height: 54px;
          padding: 15px 27px;
          border: 1px solid #d5a02c;
          background: #d5a02c;
          color: #171717;
          cursor: pointer;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.095em;
          text-align: center;
          transition:
            background 0.3s ease,
            color 0.3s ease,
            border-color 0.3s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .ulker-service-more-button:hover {
          transform: translateY(-2px);
          background: #f0bc49;
          border-color: #f0bc49;
          box-shadow: 0 10px 30px rgba(213, 160, 44, 0.18);
        }

        .ulker-service-more-button:focus-visible {
          outline: 2px solid #f4f0e8;
          outline-offset: 4px;
        }

        .ulker-service-more-button.is-expanded {
          background: transparent;
          color: #d5a02c;
        }

        .ulker-service-more-button.is-expanded:hover {
          background: #d5a02c;
          color: #171717;
        }

        .ulker-service-more-icon,
        .ulker-service-more-chevron {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ulker-service-more-count {
          margin: 0;
          color: #aaa49a;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.06em;
        }

        /* IMAGE EXPAND BUTTON */

        .ulker-service-expand {
          position: absolute;
          right: 13px;
          top: 13px;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 39px;
          height: 39px;
          border: 1px solid rgba(244, 240, 232, 0.55);
          border-radius: 50%;
          color: #f4f0e8;
          background: rgba(23, 23, 23, 0.72);
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
        }

        .ulker-service-expand:hover,
        .ulker-service-expand:focus-visible {
          background: #d5a02c;
          color: #171717;
          border-color: #d5a02c;
        }

        /* LIGHTBOX */

        .ulker-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(10, 10, 10, 0.97);
          color: #f4f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 75px 70px 50px;
        }

        .ulker-lightbox-top {
          position: absolute;
          z-index: 2;
          top: 18px;
          left: 25px;
          right: 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 0.05em;
        }

        .ulker-lightbox-close,
        .ulker-lightbox-nav {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(244, 240, 232, 0.45);
          border-radius: 50%;
          background: rgba(23, 23, 23, 0.7);
          color: #f4f0e8;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .ulker-lightbox-close:hover,
        .ulker-lightbox-nav:hover,
        .ulker-lightbox-close:focus-visible,
        .ulker-lightbox-nav:focus-visible {
          background: #d5a02c;
          color: #171717;
        }

        .ulker-lightbox-image-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .ulker-lightbox-image {
          object-fit: contain;
        }

        .ulker-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }

        .ulker-lightbox-prev {
          left: 16px;
        }

        .ulker-lightbox-next {
          right: 16px;
        }

        /* PLACEHOLDER */

        .ulker-service-placeholder {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(
              ellipse at 70% 20%,
              rgba(213, 160, 44, 0.14),
              transparent 55%
            ),
            linear-gradient(
              145deg,
              #343434,
              #171717
            );
          color: #d5a02c;
        }

        .ulker-service-placeholder span {
          font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #bcb4a5;
        }

        .ulker-service-empty {
          padding: 45px 20px;
          border: 1px solid rgba(244, 240, 232, 0.25);
          color: #bdb7ad;
          font-size: 14px;
          text-align: center;
        }

        /* TABLET */

        @media (max-width: 1023px) {
          .ulker-services-section {
            padding: 85px 0 100px;
          }

          .ulker-services-container {
            width: calc(100% - 60px);
          }

          .ulker-services-list {
            gap: 75px;
          }

          .ulker-service-block:not(:last-child)::after {
            bottom: -38px;
          }

          .ulker-service-gallery {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .ulker-service-title {
            font-size: clamp(32px, 4vw, 46px);
          }
        }

        /* MOBILE */

        @media (max-width: 767px) {
          .ulker-services-section {
            padding: 70px 0 85px;
          }

          .ulker-services-container {
            width: calc(100% - 36px);
          }

          .ulker-services-intro {
            margin-bottom: 65px;
          }

          .ulker-services-main-title {
            font-size: clamp(53px, 12vw, 75px);
          }

          .ulker-services-intro-text {
            margin-top: 22px;
            font-size: 16px;
            line-height: 1.85;
          }

          .ulker-services-list {
            gap: 65px;
          }

          .ulker-service-block:not(:last-child)::after {
            bottom: -33px;
          }

          .ulker-service-header {
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 23px;
          }

          .ulker-service-heading {
            gap: 12px;
          }

          .ulker-service-index {
            padding-top: 7px;
            font-size: 10px;
          }

          .ulker-service-title {
            font-size: clamp(29px, 7vw, 39px);
          }

          .ulker-service-description {
            font-size: 14px;
            line-height: 1.7;
          }

          .ulker-service-gallery {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .ulker-service-image-wrap {
            aspect-ratio: 3 / 4;
            border-color: rgba(244, 240, 232, 0.8);
          }

          .ulker-service-image-number {
            bottom: 11px;
            left: 11px;
          }

          .ulker-service-expand {
            width: 34px;
            height: 34px;
            right: 9px;
            top: 9px;
          }

          .ulker-service-more-wrap {
            margin-top: 25px;
          }

          .ulker-service-more-button {
            width: 100%;
            min-height: 54px;
            gap: 9px;
            padding: 14px 12px;
            font-size: 10px;
            letter-spacing: 0.035em;
          }

          .ulker-lightbox {
            padding: 75px 12px 70px;
          }

          .ulker-lightbox-top {
            left: 15px;
            right: 15px;
          }

          .ulker-lightbox-nav {
            top: auto;
            bottom: 14px;
            transform: none;
          }

          .ulker-lightbox-prev {
            left: calc(50% - 55px);
          }

          .ulker-lightbox-next {
            right: calc(50% - 55px);
          }
        }

        /* REDUCED MOTION */

        @media (prefers-reduced-motion: reduce) {
          .ulker-service-image,
          .ulker-service-image-wrap,
          .ulker-service-more-button {
            transition: none;
          }

          .ulker-service-more-button:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
