import "server-only";
import { menu as staticMenu, type MenuCategory } from "@/lib/menu-data";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type MenuItemRow = {
  id: string;
  category: string;
  name: string;
  hot_price: number | null;
  iced_price: number | null;
  single_price: number | null;
  created_at: string;
};

/**
 * Menu untuk halaman publik & kasir. Ambil dari Supabase kalau sudah
 * dikonfigurasi dan ada isinya; kalau belum (atau error), pakai data
 * statis di lib/menu-data.ts supaya situs publik tidak pernah rusak.
 */
export async function getMenu(): Promise<MenuCategory[]> {
  try {
    const rows = await getMenuItemRows();
    if (rows.length === 0) return staticMenu;

    const grouped = new Map<string, MenuCategory>();
    for (const row of rows) {
      if (!grouped.has(row.category)) {
        grouped.set(row.category, { category: row.category, items: [] });
      }
      grouped.get(row.category)!.items.push({
        name: row.name,
        hot: row.hot_price ?? undefined,
        iced: row.iced_price ?? undefined,
        price: row.single_price ?? undefined,
      });
    }
    return Array.from(grouped.values());
  } catch {
    return staticMenu;
  }
}

/** Raw rows (dengan id) untuk halaman admin kelola menu. Throw kalau gagal. */
export async function getMenuItemRows(): Promise<MenuItemRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category")
    .order("created_at");

  if (error) throw error;
  return data ?? [];
}
