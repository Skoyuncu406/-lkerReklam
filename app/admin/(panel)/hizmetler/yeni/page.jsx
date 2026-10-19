
import { requireAdmin } from "@/lib/require-admin";
import NewServiceForm from "./NewServiceForm";

export const metadata = {
  title: "Yeni Hizmet Ekle",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NewServicePage() {
  await requireAdmin();

  return <NewServiceForm />;
}
