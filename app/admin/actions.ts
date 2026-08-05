"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
