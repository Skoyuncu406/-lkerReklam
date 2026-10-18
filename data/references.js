/*
  REFERANSLAR — GEÇİCİ DEMO VERİLERİ

  Admin paneli tamamlandığında bu kayıtlar
  veritabanından alınacak.

  Logo varsa:
  logo: "/images/references/firma-logo.png"

  Logo yoksa:
  logo: null
*/

export const references = [
  {
    id: "ref-001",
    name: "Örnek Firma 01",
    logo: null,
    order: 1,
    active: true,
  },
  {
    id: "ref-002",
    name: "Örnek Firma 02",
    logo: null,
    order: 2,
    active: true,
  },
  {
    id: "ref-003",
    name: "Örnek Firma 03",
    logo: null,
    order: 3,
    active: true,
  },
  {
    id: "ref-004",
    name: "Örnek Firma 04",
    logo: null,
    order: 4,
    active: true,
  },
  {
    id: "ref-005",
    name: "Örnek Firma 05",
    logo: null,
    order: 5,
    active: true,
  },
  {
    id: "ref-006",
    name: "Örnek Firma 06",
    logo: null,
    order: 6,
    active: true,
  },
];

export function getActiveReferences() {
  return references
    .filter((reference) => reference.active)
    .sort((a, b) => a.order - b.order);
}
