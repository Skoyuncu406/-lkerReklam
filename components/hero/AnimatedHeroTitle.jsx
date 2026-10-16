
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const titleLines = [
  { text: "MARKANIZI", gold: false },
  { text: "GÖRÜNÜR", gold: true },
  { text: "KILIYORUZ.", gold: false },
];

const directions = [
  { x: -90, y: -55, rotation: -18 },
  { x: 65, y: -95, rotation: 14 },
  { x: -55, y: 90, rotation: -12 },
  { x: 85, y: 55, rotation: 16 },
  { x: 0, y: -115, rotation: -9 },
  { x: -100, y: 20, rotation: 12 },
];

export default function AnimatedHeroTitle() {
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const letters = gsap.utils.toArray(
      title.querySelectorAll("[data-hero-letter]")
    );

    if (!letters.length) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(letters, {
          opacity: 1,
          visibility: "visible",
          x: 0,
          y: 0,
          rotation: 0,
          filter: "none",
        });

        return;
      }

      // Harfler ilk render sırasında JSX tarafından
      // gizlenir. GSAP burada başlangıç konumlarını ayarlar.
      gsap.set(letters, {
        autoAlpha: 0,
        x: (index) =>
          directions[index % directions.length].x,
        y: (index) =>
          directions[index % directions.length].y,
        rotation: (index) =>
          directions[index % directions.length].rotation,
        filter: "blur(6px)",
        transformOrigin: "center center",
        force3D: true,
      });

      // Harfler farklı yönlerden gelip birleşir.
      gsap.to(letters, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotation: 0,
        filter: "blur(0px)",
        duration: 1.15,
        ease: "power3.out",
        stagger: {
          each: 0.045,
          from: "random",
        },
        delay: 0.2,
        overwrite: "auto",
        onComplete: () => {
          // Animasyon sonunda harfler normal,
          // görünür durumunda kalır.
          gsap.set(letters, {
            clearProps:
              "transform,filter,willChange",
            opacity: 1,
            visibility: "visible",
          });
        },
      });
    }, title);

    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={titleRef}
      id="hero-title"
      className="hero-title"
      aria-label="MARKANIZI GÖRÜNÜR KILIYORUZ."
    >
      {titleLines.map((line, lineIndex) => (
        <span
          key={line.text}
          className={
            line.gold ? "hero-title-gold" : undefined
          }
          aria-hidden="true"
        >
          {line.text.split(" ").map((word, wordIndex) => (
            <span
              key={`${lineIndex}-${wordIndex}`}
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              {Array.from(word).map(
                (letter, letterIndex) => (
                  <span
                    key={`${lineIndex}-${wordIndex}-${letterIndex}`}
                    data-hero-letter
                    style={{
                      display: "inline-block",
                      position: "relative",

                      // İlk HTML render'ında gizli.
                      // Böylece GSAP başlamadan
                      // başlık ekranda parlamaz.
                      opacity: 0,
                      visibility: "hidden",

                      willChange:
                        "transform, opacity",
                    }}
                  >
                    {letter}
                  </span>
                )
              )}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
