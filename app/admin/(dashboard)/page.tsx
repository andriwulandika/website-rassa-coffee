import { getMenu } from "@/lib/menu-service";
import { KasirClient } from "@/components/admin/KasirClient";

export const dynamic = "force-dynamic";

export default async function KasirPage() {
  const menu = await getMenu();

  return <KasirClient menu={menu} />;
}
