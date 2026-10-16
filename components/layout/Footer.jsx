
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const navigation = [
  { label: "Ana Sayfa", href: "#hero" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Çalışmalarımız", href: "#calismalarimiz" },
  { label: "Referanslarımız", href: "#referanslarimiz" },
  { label: "İletişim", href: "#iletisim" },
];

const email = "ulkertabelareklam@outlook.com.tr";
const phone = "905378235943";

const address =
  "Yeşilova Mahallesi, Dumlupınar Caddesi No: 59/B, Küçükçekmece / İstanbul";

const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(address);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* =====================================
            FOOTER MAIN CONTENT
        ===================================== */}
        <div className="footer-top">
          {/* BRAND */}
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
              <span>MARKANIZI GÖRÜNÜR KILIYORUZ.</span>
            </div>
          </div>

          {/* NAVIGATION */}
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

          {/* CONTACT */}
          <div className="footer-contact">
            <h3 className="footer-column-title">
              İLETİŞİM
            </h3>

            <div className="footer-contact-items">
              <a href={`tel:+${phone}`}>
                <Phone
                  size={16}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span>0537 823 59 43</span>
              </a>

              <a href={`mailto:${email}`}>
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span>{email}</span>
              </a>

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
