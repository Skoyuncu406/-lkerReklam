
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";

import AnnouncementBar from "./AnnouncementBar";

/* =========================================
   CONFIGURATION
========================================= */

const navItems = [
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Çalışmalarımız", href: "#calismalarimiz" },
  { label: "Referanslarımız", href: "#referanslarimiz" },
  { label: "İletişim", href: "#iletisim" },
];

const whatsappUrl = "https://wa.me/905378235943";

const SCROLL_THRESHOLD = 80;

/* =========================================
   NAVBAR
========================================= */

export default function Navbar() {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const desktopNavRef = useRef(null);
  const ctaRef = useRef(null);

  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const menuTimelineRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* =========================================
     SCROLL STATE
  ========================================= */

  useEffect(() => {
    let frameId = null;

    const updateNavbar = () => {
      const scrollPosition = Math.max(
        0,
        window.scrollY
      );

      setIsScrolled(
        scrollPosition > SCROLL_THRESHOLD
      );
    };

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateNavbar();
      });
    };

    updateNavbar();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "pageshow",
      updateNavbar
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "pageshow",
        updateNavbar
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /* =========================================
     NAVBAR ENTRANCE ANIMATION
  ========================================= */

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navbarRef.current,
        {
          y: -24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        [
          logoRef.current,
          desktopNavRef.current,
          ctaRef.current,
        ].filter(Boolean),
        {
          y: -10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }, navbarRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================
     ACTIVE SECTION TRACKING
  ========================================= */

  useEffect(() => {
    let frameId = null;

    const updateActiveSection = () => {
      const sections = navItems
        .map((item) =>
          document.querySelector(item.href)
        )
        .filter(Boolean);

      if (!sections.length) {
        setActiveSection("");
        return;
      }

      const navbarHeight =
        navbarRef.current?.offsetHeight || 130;

      const activationLine = navbarHeight + 16;

      // Hero görünürken aktif menü yok.
      if (
        sections[0].getBoundingClientRect().top >
        activationLine
      ) {
        setActiveSection("");
        return;
      }

      let currentSection = "";

      for (const section of sections) {
        const rect =
          section.getBoundingClientRect();

        if (rect.top <= activationLine) {
          currentSection = `#${section.id}`;
        }
      }

      setActiveSection(currentSection);
    };

    const handlePositionChange = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateActiveSection();
      });
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      handlePositionChange,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handlePositionChange
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handlePositionChange
      );

      window.removeEventListener(
        "resize",
        handlePositionChange
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /* =========================================
     MOBILE MENU GSAP
  ========================================= */

  useEffect(() => {
    const menu = menuRef.current;

    if (!menu) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items =
      menuItemsRef.current.filter(Boolean);

    const timeline = gsap.timeline({
      paused: true,

      defaults: {
        ease: "power3.out",
      },

      onReverseComplete: () => {
        gsap.set(menu, {
          visibility: "hidden",
        });
      },
    });

    timeline
      .set(menu, {
        visibility: "visible",
      })
      .fromTo(
        menu,
        {
          opacity: 0,
          y: -12,
        },
        {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? 0 : 0.42,
        }
      )
      .fromTo(
        items,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? 0 : 0.45,
          stagger: reducedMotion ? 0 : 0.06,
        },
        reducedMotion ? 0 : "-=0.18"
      );

    menuTimelineRef.current = timeline;

    return () => {
      timeline.kill();
      menuTimelineRef.current = null;
    };
  }, []);

  /* =========================================
     MOBILE MENU STATE
  ========================================= */

  useEffect(() => {
    const timeline =
      menuTimelineRef.current;

    if (!timeline) return;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      timeline.play();
    } else {
      document.body.style.overflow = "";
      timeline.reverse();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* =========================================
     ESCAPE KEY
  ========================================= */

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isMenuOpen]);

  /* =========================================
     CLOSE MOBILE MENU ON DESKTOP
  ========================================= */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px)"
    );

    const handleChange = (event) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* =====================================
          NAVBAR + ANNOUNCEMENT
      ===================================== */}

      <header
        ref={navbarRef}
        className={`navbar-shell fixed inset-x-0 top-0 z-50 ${
          isScrolled ? "is-scrolled" : ""
        }`}
      >
        {/* RED ANNOUNCEMENT BAR */}
        <AnnouncementBar />

        {/* MAIN NAVIGATION */}
        <div
          className={`navbar-inner mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 md:px-10 lg:gap-5 lg:px-10 xl:px-16 2xl:px-20 ${
            isScrolled
              ? "navbar-inner-compact"
              : ""
          }`}
        >
          {/* LOGO */}
          <div
            ref={logoRef}
            className="relative z-[60] shrink-0"
          >
            <Link
              href="/"
              aria-label="Ülker Tabela Reklam - Ana Sayfa"
              onClick={closeMenu}
              className="group flex items-center"
            >
              <div className="navbar-logo relative">
                <Image
                  src="/images/logo/ulker-logo.png"
                  alt="Ülker Tabela Reklam"
                  fill
                  priority
                  sizes="(max-width: 767px) 125px, 155px"
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          <nav
            ref={desktopNavRef}
            aria-label="Ana menü"
            className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-8 2xl:gap-10"
          >
            {navItems.map((item) => {
              const isActive =
                activeSection === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    isActive
                      ? "location"
                      : undefined
                  }
                  className={`nav-link ${
                    isActive ? "is-active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CTA */}
          <div
            ref={ctaRef}
            className="hidden shrink-0 items-center justify-end lg:flex"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp üzerinden teklif al"
              className="nav-cta"
            >
              <span>Teklif Al</span>

              <ArrowUpRight
                size={19}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={
              isMenuOpen
                ? "Menüyü kapat"
                : "Menüyü aç"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setIsMenuOpen((prev) => !prev)
            }
            className="relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center text-[#F4F0E8] transition-colors duration-300 hover:text-[#D5A02C] lg:hidden"
          >
            {isMenuOpen ? (
              <X
                size={27}
                strokeWidth={1.4}
              />
            ) : (
              <Menu
                size={27}
                strokeWidth={1.4}
              />
            )}
          </button>
        </div>
      </header>

      {/* =====================================
          MOBILE FULLSCREEN MENU
      ===================================== */}

      <div
        id="mobile-navigation"
        ref={menuRef}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className="mobile-menu invisible fixed inset-0 z-40 flex flex-col overflow-y-auto opacity-0 lg:hidden"
      >
        <div className="flex min-h-screen flex-col px-7 pb-10 pt-[145px] sm:px-12">
          {/* MENU LABEL */}
          <div className="mb-9 flex items-center gap-3">
            <span className="h-px w-8 bg-[#D5A02C]" />

            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D5A02C]">
              Menü
            </span>
          </div>

          {/* MOBILE LINKS */}
          <nav
            aria-label="Mobil menü"
            className="flex flex-col gap-6"
          >
            {navItems.map((item, index) => {
              const isActive =
                activeSection === item.href;

              return (
                <div
                  key={item.href}
                  ref={(el) => {
                    menuItemsRef.current[index] =
                      el;
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    tabIndex={
                      isMenuOpen ? 0 : -1
                    }
                    aria-current={
                      isActive
                        ? "location"
                        : undefined
                    }
                    className={`mobile-menu-link ${
                      isActive
                        ? "is-active"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* MOBILE CTA */}
          <div className="mt-11 border-t border-white/10 pt-7">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              tabIndex={
                isMenuOpen ? 0 : -1
              }
              className="mobile-cta"
            >
              <span className="mobile-cta-text">
                Teklif Al
              </span>

              <ArrowUpRight
                size={20}
                strokeWidth={1.7}
                aria-hidden="true"
                className="mobile-cta-icon"
              />
            </a>
          </div>

          {/* MOBILE FOOTER */}
          <div className="mt-auto pt-12">
            <div className="mb-5 h-px w-full bg-white/10" />

            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A9A49B]">
              Ülker Tabela Reklam
            </p>

            <p className="mt-2 font-body text-[12px] text-[#77736E]">
              Küçükçekmece / İstanbul
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
