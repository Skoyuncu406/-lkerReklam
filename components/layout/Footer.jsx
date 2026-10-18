
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

/* =========================================
   NAVIGATION
========================================= */

const navigation = [
  { label: "Ana Sayfa", href: "#hero" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Hizmetlerimiz", href: "#hizmetlerimiz" },
  { label: "Referanslarımız", href: "#referanslarimiz" },
  { label: "İletişim", href: "#iletisim" },
];

/* =========================================
   CONTACT INFORMATION
========================================= */

const email = "ulkertabelareklam@outlook.com.tr";

const phones = [
  {
    display: "0537 823 59 43",
    number: "905378235943",
  },
  {
    display: "0507 333 20 00",
    number: "905073332000",
  },
];

const instagramUsername = "ulker.tabela.reklam";

const instagramUrl =
  `https://www.instagram.com/${instagramUsername}/`;

const address =
  "Yeşilova Mahallesi, Dumlupınar Caddesi No: 59/B, Küçükçekmece / İstanbul";

const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(address);

/* =========================================
   INSTAGRAM ICON
========================================= */

function InstagramIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        ry="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/* =========================================
   FOOTER
========================================= */

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* =====================================
            FOOTER MAIN CONTENT
        ===================================== */}

        <div className="footer-top">

          {/* =====================================
              BRAND
          ===================================== */}

          <div className="footer-brand">
            <Link
              href="#hero"
              className="footer-logo"
              aria-label="Ülker Tabela Reklam - Ana Sayfa"
            >
              <Image
                src="/images/logo/ulker-logo.png"
                alt="Ülker Tabela Reklam"
                width={180}
                height={80}
                sizes="(max-width: 767px) 150px, 180px"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "left center",
                }}
              />
            </Link>

            <p className="footer-brand-description">
              Fikirleri görünür, markaları unutulmaz
              kılıyoruz. Tabela, reklam ve görsel
              uygulama çözümleriyle markanızın
              yanında yer alıyoruz.
            </p>

            <div className="footer-brand-tagline">
              <span
                className="footer-brand-line"
                aria-hidden="true"
              />

              <span>
                MARKANIZI GÖRÜNÜR KILIYORUZ.
              </span>
            </div>
          </div>

          {/* =====================================
              NAVIGATION
          ===================================== */}

          <div className="footer-navigation">
            <h3 className="footer-column-title">
              HIZLI ERİŞİM
            </h3>

            <nav aria-label="Footer menüsü">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="footer-nav-link"
                >
                  {item.label}

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* =====================================
              CONTACT
          ===================================== */}

          <div className="footer-contact">
            <h3 className="footer-column-title">
              İLETİŞİM
            </h3>

            <div className="footer-contact-items">

              {/* PHONE NUMBERS */}

              {phones.map((phone) => (
                <a
                  key={phone.number}
                  href={`tel:+${phone.number}`}
                  aria-label={`${phone.display} numarasını ara`}
                >
                  <Phone
                    size={16}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />

                  <span>{phone.display}</span>
                </a>
              ))}

              {/* EMAIL */}

              <a href={`mailto:${email}`}>
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />

                <span>{email}</span>
              </a>

              {/* INSTAGRAM */}

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram hesabımız: @${instagramUsername}`}
              >
                <InstagramIcon />

                <span>
                  @{instagramUsername}
                </span>
              </a>

              {/* ADDRESS */}

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin
                  size={17}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />

                <span>
                  Yeşilova Mahallesi,
                  Dumlupınar Caddesi
                  <br />
                  No: 59/B, Küçükçekmece / İstanbul
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* =====================================
            FOOTER BOTTOM
        ===================================== */}

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Ülker Tabela
            Reklam. Tüm hakları saklıdır.
          </p>

          <span className="footer-bottom-signature">
            İSTANBUL, TÜRKİYE
          </span>

          <a
            href="#hero"
            className="footer-back-top"
            aria-label="Sayfanın başına dön"
          >
            <span>BAŞA DÖN</span>

            <ArrowUpRight
              size={16}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
