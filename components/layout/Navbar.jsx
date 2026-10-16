"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
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
const phoneUrl = "tel:+905378235943";

const SCROLL_THRESHOLD = 80;

/* =========================================
   QUICK CONTACT LINKS
========================================= */
function QuickContactLinks({ mobile = false }) {
  return (
    <div className={`ulker-contact-group${mobile ? " ulker-contact-group-mobile" : ""}`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ulker-contact-button ulker-contact-whatsapp"
        aria-label="WhatsApp üzerinden iletişime geç"
        title="WhatsApp"
      >
        <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.46 0 .09 5.36.08 11.95c0 2.1.55 4.15 1.6 5.97L0 24l6.25-1.64a11.94 11.94 0 0 0 5.79 1.48h.01c6.59 0 11.96-5.36 11.96-11.95a11.87 11.87 0 0 0-3.49-8.41ZM12.05 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.71.97.99-3.61-.24-.37a9.87 9.87 0 0 1-1.52-5.25c0-5.46 4.45-9.9 9.91-9.9a9.84 9.84 0 0 1 7 2.9 9.85 9.85 0 0 1 2.9 7c0 5.46-4.45 9.9-9.92 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
        </svg>
      </a>
      <a
        href={phoneUrl}
        className="ulker-contact-button ulker-contact-phone"
        aria-label="0537 823 59 43 numarasını ara"
        title="Hemen ara"
      >
        <Phone size={20} strokeWidth={1.9} aria-hidden="true" />
      </a>
    </div>
  );
}

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

  // Sabit header kaydırma sırasında küçülür. Bağlantıyı her zaman
  // küçülmüş header yüksekliğine göre hizala; CSS scroll-margin ile
  // ikinci kez boşluk ekleme.
  const handleSectionClick = (event, href) => {
    const section = document.querySelector(href);
    if (!section) return;

    event.preventDefault();
    setIsMenuOpen(false);

    const compactNavbarHeight = window.innerWidth >= 1024 ? 76 : 68;
    const announcementHeight = window.innerWidth <= 767 ? 30 : 34;
    const offset = compactNavbarHeight + announcementHeight;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Mobil menünün body scroll kilidinin kaldırılmasını bekle.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: Math.max(0, sectionTop - offset),
          behavior: reducedMotion ? "instant" : "smooth",
        });

        window.history.replaceState(null, "", href);
      });
    });
  };

  return (
    <>
      <style jsx global>{`
        .ulker-contact-group { display: inline-flex !important; flex-direction: row !important; align-items: center !important; flex-wrap: nowrap !important; gap: 12px !important; flex-shrink: 0 !important; margin-right: 18px !important; }
        .ulker-contact-button { position: relative !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; flex: 0 0 42px !important; width: 42px !important; height: 42px !important; min-width: 42px !important; border: 1px solid currentColor !important; border-radius: 50% !important; text-decoration: none !important; box-sizing: border-box !important; transition: transform .25s ease, background-color .25s ease, color .25s ease !important; }
        .ulker-contact-button svg { display: block !important; position: relative !important; width: 20px !important; height: 20px !important; flex-shrink: 0 !important; }
        .ulker-contact-whatsapp { color: #25d366 !important; background: rgba(37,211,102,.12) !important; animation: ulker-wa-pulse-fixed 2.2s ease-in-out infinite !important; }
        .ulker-contact-phone { color: #ff4545 !important; background: rgba(255,69,69,.12) !important; animation: ulker-phone-pulse-fixed 2.2s ease-in-out infinite -1.1s !important; }
        @keyframes ulker-wa-pulse-fixed { 0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0), 0 0 0 rgba(37,211,102,0); } 50% { box-shadow: 0 0 0 5px rgba(37,211,102,.14), 0 0 22px rgba(37,211,102,.65); } }
        @keyframes ulker-phone-pulse-fixed { 0%,100% { box-shadow: 0 0 0 0 rgba(255,69,69,0), 0 0 0 rgba(255,69,69,0); } 50% { box-shadow: 0 0 0 5px rgba(255,69,69,.14), 0 0 22px rgba(255,69,69,.65); } }
        .ulker-contact-whatsapp:hover { color: #fff !important; background: #25d366 !important; transform: translateY(-2px); }
        .ulker-contact-phone:hover { color: #fff !important; background: #ff4545 !important; transform: translateY(-2px); }
        .ulker-contact-button:focus-visible { outline: 2px solid #d5a02c; outline-offset: 3px; }
        @media(max-width:1023px) { .ulker-contact-group-mobile { gap: 8px !important; margin-right: 0 !important; } .ulker-contact-group-mobile .ulker-contact-button { flex-basis: 38px !important; min-width: 38px !important; width: 38px !important; height: 38px !important; } .ulker-contact-group-mobile .ulker-contact-button svg { width: 18px !important; height: 18px !important; } }
        @media(max-width:380px) { .ulker-contact-group-mobile { gap: 5px !important; } .ulker-contact-group-mobile .ulker-contact-button { flex-basis: 34px !important; min-width: 34px !important; width: 34px !important; height: 34px !important; } }
        @media(prefers-reduced-motion:reduce) { .ulker-contact-whatsapp, .ulker-contact-phone { animation: none !important; } }
      `}</style>
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
                  onClick={(event) => handleSectionClick(event, item.href)}
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
            className="hidden shrink-0 items-center justify-end gap-4 lg:flex"
          >
            <QuickContactLinks />
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

          {/* MOBILE CONTACT ICONS + MENU BUTTON */}
          <div className="relative z-[60] ml-auto flex shrink-0 items-center gap-2 lg:hidden">
            <QuickContactLinks mobile />
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
                    onClick={(event) => handleSectionClick(event, item.href)}
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
