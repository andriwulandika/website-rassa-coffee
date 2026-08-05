import { getMenuItemRows } from "@/lib/menu-service";
import { MenuManager } from "@/components/admin/MenuManager";
import { getErrorMessage } from "@/lib/error-message";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  try {
    const items = await getMenuItemRows();
    return <MenuManager items={items} />;
  } catch (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h1 className="text-lg font-semibold text-destructive">
          Kelola menu belum bisa dimuat
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          {getErrorMessage(error, "Terjadi kesalahan.")}
        </p>
        <p className="mt-2 text-sm text-foreground/70">
          Pastikan environment variable <code>SUPABASE_URL</code> dan{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> sudah diset, dan skema tabel
          sudah dibuat (lihat <code>supabase/schema.sql</code>).
        </p>
      </div>
    );
  }
}
