
"use client";

import { usePathname } from "next/navigation";
import FreeDiscoveryButton from "./FreeDiscoveryButton";

export default function ConditionalFreeDiscoveryButton() {
  const pathname = usePathname();

  // Admin panelinin tüm sayfalarında butonu gizle
  const isAdminPage =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminPage) {
    return null;
  }

  return <FreeDiscoveryButton />;
}
