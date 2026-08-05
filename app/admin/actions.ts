"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, isValidAdminPassword } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 hari

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!isValidAdminPassword(password)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  cookies().set(ADMIN_SESSION_COOKIE, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  cookies().delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export type CartItemInput = {
  name: string;
  variant?: string;
  price: number;
  quantity: number;
};

export async function createTransaction(items: CartItemInput[]) {
  if (!items.length) {
    return { success: false as const, error: "Keranjang masih kosong." };
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  try {
    const supabase = getSupabaseAdmin();

    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({ total_amount: total })
      .select("id")
      .single();

    if (transactionError || !transaction) {
      throw transactionError ?? new Error("Gagal membuat transaksi.");
    }

    const rows = items.map((item) => ({
      transaction_id: transaction.id,
      item_name: item.name,
      variant: item.variant ?? null,
      unit_price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("transaction_items")
      .insert(rows);

    if (itemsError) {
      throw itemsError;
    }

    return { success: true as const, transactionId: transaction.id as string, total };
  } catch (error) {
    console.error("createTransaction failed:", error);
    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Gagal menyimpan transaksi. Cek konfigurasi Supabase.",
    };
  }
}

export type MenuItemInput = {
  category: string;
  name: string;
  hotPrice: number | null;
  icedPrice: number | null;
  singlePrice: number | null;
};

type ActionResult = { success: true } | { success: false; error: string };

function revalidateMenu() {
  revalidatePath("/menu");
  revalidatePath("/admin");
  revalidatePath("/admin/menu");
}

function toActionError(error: unknown, fallback: string): ActionResult {
  console.error(fallback, error);
  return {
    success: false,
    error: error instanceof Error ? error.message : fallback,
  };
}

export async function createMenuItem(input: MenuItemInput): Promise<ActionResult> {
  if (!input.name.trim() || !input.category.trim()) {
    return { success: false, error: "Nama dan kategori wajib diisi." };
  }
  if (!input.hotPrice && !input.icedPrice && !input.singlePrice) {
    return { success: false, error: "Isi minimal satu harga (Hot/Iced/Harga)." };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("menu_items").insert({
      category: input.category.trim(),
      name: input.name.trim(),
      hot_price: input.hotPrice,
      iced_price: input.icedPrice,
      single_price: input.singlePrice,
    });
    if (error) throw error;

    revalidateMenu();
    return { success: true };
  } catch (error) {
    return toActionError(error, "Gagal menambah menu.");
  }
}

export async function updateMenuItem(
  id: string,
  input: MenuItemInput
): Promise<ActionResult> {
  if (!input.name.trim() || !input.category.trim()) {
    return { success: false, error: "Nama dan kategori wajib diisi." };
  }
  if (!input.hotPrice && !input.icedPrice && !input.singlePrice) {
    return { success: false, error: "Isi minimal satu harga (Hot/Iced/Harga)." };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("menu_items")
      .update({
        category: input.category.trim(),
        name: input.name.trim(),
        hot_price: input.hotPrice,
        iced_price: input.icedPrice,
        single_price: input.singlePrice,
      })
      .eq("id", id);
    if (error) throw error;

    revalidateMenu();
    return { success: true };
  } catch (error) {
    return toActionError(error, "Gagal menyimpan perubahan menu.");
  }
}

export async function deleteMenuItem(id: string): Promise<ActionResult> {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) throw error;

    revalidateMenu();
    return { success: true };
  } catch (error) {
    return toActionError(error, "Gagal menghapus menu.");
  }
}
