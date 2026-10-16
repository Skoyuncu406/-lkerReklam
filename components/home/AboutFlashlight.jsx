
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutFlashlight() {
  const lightRef = useRef(null);

  useEffect(() => {
    if (!lightRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lightRef.current,
        {
          opacity: 0,
          rotation: -4,
        },
        {
          opacity: 1,
          rotation: 2,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="about-flashlight"
      aria-hidden="true"
    >
      <div
        ref={lightRef}
        className="about-flashlight-beam"
      />
      <div className="about-flashlight-glow" />
    </div>
  );
}
