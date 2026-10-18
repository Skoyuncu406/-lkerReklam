/*
  HİZMETLER — DEMO VERİLERİ

  Admin paneli ve veritabanı bağlandığında
  bu veriler dinamik olarak alınacak.

  Görsel ekleme örneği:
  {
    id: "img-001",
    src: "/images/services/isikli-tabela-01.jpg",
    alt: "Işıklı tabela uygulaması"
  }

  src: null olduğunda demo görsel alanı gösterilir.
*/

export const services = [
  {
    id: "service-001",
    title: "Işıklı ve Işıksız Tabelalar",
    description:
      "Markanızın kimliğini öne çıkaran LED, kutu harf, pleksi, krom ve özel üretim tabela çözümleri.",
    order: 1,
    active: true,
    images: [
      { id: "s1-01", src: null, alt: "Tabela uygulaması 01" },
      { id: "s1-02", src: null, alt: "Tabela uygulaması 02" },
      { id: "s1-03", src: null, alt: "Tabela uygulaması 03" },
      { id: "s1-04", src: null, alt: "Tabela uygulaması 04" },
      { id: "s1-05", src: null, alt: "Tabela uygulaması 05" },
      { id: "s1-06", src: null, alt: "Tabela uygulaması 06" },
      { id: "s1-07", src: null, alt: "Tabela uygulaması 07" },
    ],
  },
  {
    id: "service-002",
    title: "Cephe Giydirme ve Totemler",
    description:
      "Kompozit cephe kaplamaları, kurumsal dış cephe uygulamaları ve yüksek görünürlüğe sahip totem çözümleri.",
    order: 2,
    active: true,
    images: [
      { id: "s2-01", src: null, alt: "Cephe uygulaması 01" },
      { id: "s2-02", src: null, alt: "Cephe uygulaması 02" },
      { id: "s2-03", src: null, alt: "Cephe uygulaması 03" },
      { id: "s2-04", src: null, alt: "Cephe uygulaması 04" },
      { id: "s2-05", src: null, alt: "Cephe uygulaması 05" },
      { id: "s2-06", src: null, alt: "Cephe uygulaması 06" },
    ],
  },
  {
    id: "service-003",
    title: "Yönlendirme ve İç Mekân Grafikleri",
    description:
      "Ofis, mağaza ve kurumsal alanlar için yönlendirme sistemleri, kapı isimlikleri ve dijital baskı uygulamaları.",
    order: 3,
    active: true,
    images: [
      { id: "s3-01", src: null, alt: "Yönlendirme uygulaması 01" },
      { id: "s3-02", src: null, alt: "Yönlendirme uygulaması 02" },
      { id: "s3-03", src: null, alt: "Yönlendirme uygulaması 03" },
      { id: "s3-04", src: null, alt: "Yönlendirme uygulaması 04" },
      { id: "s3-05", src: null, alt: "Yönlendirme uygulaması 05" },
    ],
  },
  {
    id: "service-004",
    title: "Özel Tasarım Projeler",
    description:
      "Markanızın karakterine ve mimari yapısına uygun, özgün tasarım ve özel üretim reklam uygulamaları.",
    order: 4,
    active: true,
    images: [
      { id: "s4-01", src: null, alt: "Özel tasarım 01" },
      { id: "s4-02", src: null, alt: "Özel tasarım 02" },
      { id: "s4-03", src: null, alt: "Özel tasarım 03" },
      { id: "s4-04", src: null, alt: "Özel tasarım 04" },
      { id: "s4-05", src: null, alt: "Özel tasarım 05" },
      { id: "s4-06", src: null, alt: "Özel tasarım 06" },
    ],
  },
];

export function getActiveServices() {
  return services
    .filter((service) => service.active)
    .sort((a, b) => a.order - b.order);
}
