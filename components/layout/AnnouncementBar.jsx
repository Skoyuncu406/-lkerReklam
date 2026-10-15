
const announcements = [
  "REKLAM & TABELA",
  "GÜVENİLİR HİZMET",
  "PROFESYONEL ÇÖZÜMLER",
  "MARKANIZA DEĞER KATIYORUZ",
  "YARATICI REKLAM UYGULAMALARI",
  "ÜLKER TABELA REKLAM",
];

function AnnouncementGroup({ hidden = false }) {
  return (
    <div
      className="announcement-group"
      aria-hidden={hidden}
    >
      {announcements.map((item) => (
        <div className="announcement-item" key={item}>
          <span>{item}</span>
          <span className="announcement-star" aria-hidden="true">
            ✳
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div
      className="announcement-bar"
      aria-label="Ülker Tabela Reklam hizmetleri"
    >
      <div className="announcement-track">
        <AnnouncementGroup />
        <AnnouncementGroup hidden />
      </div>
    </div>
  );
}
