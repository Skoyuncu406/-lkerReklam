
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroBackground() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const element = backgroundRef.current;

    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reduceMotion.matches) {
      gsap.set(element, { opacity: 1 });
      return;
    }

    const animation = gsap.fromTo(
      element,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="hero-background"
      aria-hidden="true"
    />
  );
}
