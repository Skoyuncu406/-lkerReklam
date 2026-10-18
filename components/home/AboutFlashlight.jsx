
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutFlashlight() {
  const containerRef = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const light = lightRef.current;

    if (!container || !light) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    let tween;

    const animateLight = () => {
      if (tween) tween.kill();

      gsap.set(light, {
        left: "0%",
        top: "0%",
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        opacity: 1,
      });

      tween = gsap.to(light, {
        x: container.clientWidth,
        y: container.clientHeight,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    animateLight();

    const observer = new ResizeObserver(() => {
      animateLight();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (tween) tween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="about-flashlight"
      aria-hidden="true"
    >
      <div
        ref={lightRef}
        className="about-flashlight-beam"
      />
    </div>
  );
}
