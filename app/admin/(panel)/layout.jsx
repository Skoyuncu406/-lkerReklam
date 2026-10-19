
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#171717] text-[#F4F0E8]">
      {children}
    </div>
  );
}
