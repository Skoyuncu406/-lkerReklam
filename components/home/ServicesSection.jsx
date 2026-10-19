
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  ImageIcon,
  Maximize2,
  X,
} from "lucide-react";

/* =========================================
   SERVICE GALLERY
========================================= */

function ServiceGallery({ service }) {
  const sliderRef = useRef(null);
  const lightboxTouchStartX = useRef(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const images = service.images || [];
  const viewableImages = images.filter((image) => Boolean(image.src));
  const activeImage = lightboxIndex === null ? null : viewableImages[lightboxIndex];

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight" && viewableImages.length > 1) {
        setLightboxIndex((current) => (current + 1) % viewableImages.length);
      }
      if (event.key === "ArrowLeft" && viewableImages.length > 1) {
        setLightboxIndex((current) =>
          (current - 1 + viewableImages.length) % viewableImages.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, viewableImages.length]);

  const updateButtons = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const maxScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth
    );

    setCanPrev(slider.scrollLeft > 2);
    setCanNext(slider.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    updateButtons();

    const observer = new ResizeObserver(updateButtons);

    observer.observe(slider);

    const track = slider.firstElementChild;

    if (track) {
      observer.observe(track);
    }

    return () => {
      observer.disconnect();
    };
  }, [updateButtons, images.length]);

  const moveSlider = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const firstItem = slider.querySelector(
      ".ulker-service-slide"
    );

    const track = slider.querySelector(
      ".ulker-service-track"
    );

    if (!firstItem) return;

    const gap = track
      ? parseFloat(getComputedStyle(track).columnGap) || 0
      : 0;

    const distance =
      firstItem.getBoundingClientRect().width + gap;

    slider.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
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

        {/* DESKTOP / TABLET CONTROLS */}

        {images.length > 0 && (
          <div className="ulker-service-controls">
            <button
              type="button"
              onClick={() => moveSlider(-1)}
              disabled={!canPrev}
              aria-label={`${service.title}: önceki görsel`}
              className="ulker-service-arrow"
            >
              <ArrowLeft
                size={20}
                strokeWidth={1.6}
              />
            </button>

            <button
              type="button"
              onClick={() => moveSlider(1)}
              disabled={!canNext}
              aria-label={`${service.title}: sonraki görsel`}
              className="ulker-service-arrow"
            >
              <ArrowRight
                size={20}
                strokeWidth={1.6}
              />
            </button>
          </div>
        )}
      </div>

      {/* IMAGE SLIDER */}

      {images.length > 0 ? (
        <div
          ref={sliderRef}
          className="ulker-service-slider"
          onScroll={updateButtons}
          aria-label={`${service.title} görselleri`}
          role="region"
          tabIndex={0}
        >
          <div className="ulker-service-track">
            {images.map((image, index) => (
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
                      onClick={() => {
                        const selected = viewableImages.findIndex((item) => item.id === image.id);
                        if (selected !== -1) setLightboxIndex(selected);
                      }}
                    >
                      <Maximize2 size={19} strokeWidth={1.7} aria-hidden="true" />
                    </button>
                  )}

                  <span className="ulker-service-image-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="ulker-service-empty">
          Bu hizmet için henüz görsel eklenmedi.
        </div>
      )}
      {activeImage && createPortal(
        <div
          className="ulker-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${service.title} görsel görüntüleyici`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxIndex(null);
          }}
          onTouchStart={(event) => {
            lightboxTouchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = lightboxTouchStartX.current;
            const endX = event.changedTouches[0]?.clientX;
            lightboxTouchStartX.current = null;
            if (startX === null || endX == null || viewableImages.length < 2) return;
            const delta = endX - startX;
            if (Math.abs(delta) < 55) return;
            setLightboxIndex((current) =>
              delta < 0
                ? (current + 1) % viewableImages.length
                : (current - 1 + viewableImages.length) % viewableImages.length
            );
          }}
        >
          <div className="ulker-lightbox-top">
            <span>{service.title} — {lightboxIndex + 1} / {viewableImages.length}</span>
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
              alt={activeImage.alt || `${service.title} görsel ${lightboxIndex + 1}`}
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
                onClick={() => setLightboxIndex((i) => (i - 1 + viewableImages.length) % viewableImages.length)}
              >
                <ArrowLeft size={25} />
              </button>
              <button
                type="button"
                className="ulker-lightbox-nav ulker-lightbox-next"
                aria-label="Sonraki görsel"
                onClick={() => setLightboxIndex((i) => (i + 1) % viewableImages.length)}
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
        {/* SECTION INTRO */}

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

        {/* SERVICES */}

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

        /* =====================================
           SECTION
        ===================================== */

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

        /* =====================================
           INTRO
        ===================================== */

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

        /* =====================================
           SERVICE BLOCKS
        ===================================== */

        .ulker-services-list {
          display: flex;
          flex-direction: column;
          gap: 100px;
        }

        .ulker-service-block {
          position: relative;
          min-width: 0;
        }

        /* SERVICE DIVIDER */

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

        /* =====================================
           SLIDER CONTROLS
        ===================================== */

        .ulker-service-controls {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          gap: 10px;
        }

        .ulker-service-arrow {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 47px;
          height: 47px;

          border: 1px solid rgba(244, 240, 232, 0.5);
          border-radius: 50%;

          background: transparent;
          color: #f4f0e8;

          cursor: pointer;

          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            opacity 0.3s ease;
        }

        .ulker-service-arrow:not(:disabled):hover {
          background: #d5a02c;
          border-color: #d5a02c;
          color: #171717;
        }

        .ulker-service-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .ulker-service-arrow:focus-visible {
          outline: 2px solid #d5a02c;
          outline-offset: 4px;
        }

        /* =====================================
           SLIDER
        ===================================== */

        .ulker-service-slider {
          width: 100%;

          overflow-x: auto;
          overflow-y: hidden;

          scrollbar-width: none;
          -ms-overflow-style: none;

          scroll-snap-type: x mandatory;
          overscroll-behavior-x: contain;

          -webkit-overflow-scrolling: touch;
          touch-action: pan-x pan-y;
        }

        .ulker-service-slider::-webkit-scrollbar {
          display: none;
        }

        .ulker-service-slider:focus-visible {
          outline: 2px solid #d5a02c;
          outline-offset: 4px;
        }

        .ulker-service-track {
          display: flex;
          align-items: stretch;
          gap: 14px;
        }

        .ulker-service-slide {
          flex: 0 0 calc((100% - 56px) / 5);
          min-width: 0;
          scroll-snap-align: start;
        }

        /* =====================================
           IMAGE FRAMES
        ===================================== */

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

        /* FULLSCREEN IMAGE VIEWER */
        .ulker-service-expand {
          position: absolute; right: 13px; top: 13px; z-index: 2;
          display: grid; place-items: center; width: 39px; height: 39px;
          border: 1px solid rgba(244,240,232,.55); border-radius: 50%;
          color: #f4f0e8; background: rgba(23,23,23,.72);
          cursor: pointer; backdrop-filter: blur(8px);
          transition: background .2s ease, border-color .2s ease, color .2s ease;
        }
        .ulker-service-expand:hover, .ulker-service-expand:focus-visible {
          background: #d5a02c; color: #171717; border-color: #d5a02c;
        }
        .ulker-lightbox {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(10,10,10,.97); color: #f4f0e8;
          display: flex; align-items: center; justify-content: center;
          padding: 75px 70px 50px;
        }
        .ulker-lightbox-top {
          position: absolute; z-index: 2; top: 18px; left: 25px; right: 25px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 15px; font-family: var(--font-dm-sans), Arial, sans-serif;
          font-size: 12px; letter-spacing: .05em;
        }
        .ulker-lightbox-close, .ulker-lightbox-nav {
          display: grid; place-items: center; flex-shrink: 0;
          width: 44px; height: 44px; border: 1px solid rgba(244,240,232,.45);
          border-radius: 50%; background: rgba(23,23,23,.7);
          color: #f4f0e8; cursor: pointer;
          transition: background .2s ease, color .2s ease;
        }
        .ulker-lightbox-close:hover, .ulker-lightbox-nav:hover,
        .ulker-lightbox-close:focus-visible, .ulker-lightbox-nav:focus-visible {
          background: #d5a02c; color: #171717;
        }
        .ulker-lightbox-image-wrap { position: relative; width: 100%; height: 100%; }
        .ulker-lightbox-image { object-fit: contain; }
        .ulker-lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); z-index: 2; }
        .ulker-lightbox-prev { left: 16px; }
        .ulker-lightbox-next { right: 16px; }
        @media (max-width: 767px) {
          .ulker-service-expand { width: 34px; height: 34px; right: 9px; top: 9px; }
          .ulker-lightbox { padding: 75px 12px 70px; }
          .ulker-lightbox-top { left: 15px; right: 15px; }
          .ulker-lightbox-nav { top: auto; bottom: 14px; transform: none; }
          .ulker-lightbox-prev { left: calc(50% - 55px); }
          .ulker-lightbox-next { right: calc(50% - 55px); }
        }

        /* =====================================
           DEMO IMAGE PLACEHOLDER
        ===================================== */

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

        /* =====================================
           TABLET — THREE IMAGES
        ===================================== */

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

          .ulker-service-slide {
            flex-basis: calc((100% - 28px) / 3);
          }

          .ulker-service-title {
            font-size: clamp(32px, 4vw, 46px);
          }
        }

        /* =====================================
           MOBILE — TWO IMAGES
        ===================================== */

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

          .ulker-service-controls {
            display: none;
          }

          .ulker-service-track {
            gap: 10px;
          }

          .ulker-service-slide {
            flex-basis: calc((100% - 10px) / 2);
          }

          .ulker-service-image-wrap {
            aspect-ratio: 3 / 4;

            border-color: rgba(244, 240, 232, 0.8);
          }

          .ulker-service-image-number {
            bottom: 11px;
            left: 11px;
          }
        }

        /* =====================================
           REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {
          .ulker-service-image,
          .ulker-service-image-wrap {
            transition: none;
          }

          .ulker-service-slider {
            scroll-behavior: auto;
          }
        }

      `}</style>
    </section>
  );
}
