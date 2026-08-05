import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { formatRp } from "@/lib/menu-data";

export const dynamic = "force-dynamic";

type Transaction = {
  id: string;
  total_amount: number;
  created_at: string;
};

type TopItem = {
  name: string;
  qty: number;
  revenue: number;
};

async function getDashboardData() {
  const supabase = getSupabaseAdmin();

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const { data: monthTransactions, error } = await supabase
    .from("transactions")
    .select("id, total_amount, created_at")
    .gte("created_at", startOfMonth.toISOString())
    .order("created_at", { ascending: false });

  if (error) throw error;

  const transactions = (monthTransactions ?? []) as Transaction[];

  const todayTotal = transactions
    .filter((t) => new Date(t.created_at) >= startOfToday)
    .reduce((sum, t) => sum + t.total_amount, 0);
  const weekTotal = transactions
    .filter((t) => new Date(t.created_at) >= startOfWeek)
    .reduce((sum, t) => sum + t.total_amount, 0);
  const monthTotal = transactions.reduce((sum, t) => sum + t.total_amount, 0);

  const recentTransactions = transactions.slice(0, 20);

  let topItems: TopItem[] = [];
  if (transactions.length > 0) {
    const { data: items, error: itemsError } = await supabase
      .from("transaction_items")
      .select("item_name, variant, quantity, subtotal, transaction_id")
      .in(
        "transaction_id",
        transactions.map((t) => t.id)
      );

    if (itemsError) throw itemsError;

    const topItemsMap = new Map<string, TopItem>();
    for (const item of items ?? []) {
      const key = `${item.item_name}${item.variant ? ` (${item.variant})` : ""}`;
      const existing = topItemsMap.get(key) ?? { name: key, qty: 0, revenue: 0 };
      existing.qty += item.quantity;
      existing.revenue += item.subtotal;
      topItemsMap.set(key, existing);
    }
    topItems = Array.from(topItemsMap.values())
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 10);
  }

  return { todayTotal, weekTotal, monthTotal, recentTransactions, topItems };
}

export default async function LaporanPage() {
  let data: Awaited<ReturnType<typeof getDashboardData>> | null = null;
  let setupError: string | null = null;

  try {
    data = await getDashboardData();
  } catch (error) {
    setupError =
      error instanceof Error
        ? error.message
        : "Gagal memuat data laporan. Cek konfigurasi Supabase.";
  }

  if (setupError || !data) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h1 className="text-lg font-semibold text-destructive">
          Laporan belum bisa dimuat
        </h1>
        <p className="mt-2 text-sm text-foreground/70">{setupError}</p>
        <p className="mt-2 text-sm text-foreground/70">
          Pastikan environment variable <code>SUPABASE_URL</code> dan{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> sudah diset, dan skema tabel
          sudah dibuat (lihat <code>supabase/schema.sql</code>).
        </p>
      </div>
    );
  }

  const { todayTotal, weekTotal, monthTotal, recentTransactions, topItems } = data;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Hari Ini", value: todayTotal },
          { label: "Minggu Ini", value: weekTotal },
          { label: "Bulan Ini", value: monthTotal },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-primary/10 bg-primary/5 p-5"
          >
            <p className="text-sm text-foreground/60">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-primary">
              {formatRp(value)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5">
          <h2 className="text-lg font-semibold text-primary">Item Terlaris</h2>
          {topItems.length === 0 ? (
            <p className="mt-3 text-sm text-foreground/60">
              Belum ada transaksi bulan ini.
            </p>
          ) : (
            <div className="mt-3 divide-y divide-primary/10">
              {topItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-foreground/60">
                    {item.qty}x · {formatRp(item.revenue)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5">
          <h2 className="text-lg font-semibold text-primary">
            Transaksi Terbaru
          </h2>
          {recentTransactions.length === 0 ? (
            <p className="mt-3 text-sm text-foreground/60">
              Belum ada transaksi bulan ini.
            </p>
          ) : (
            <div className="mt-3 divide-y divide-primary/10">
              {recentTransactions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="text-foreground/70">
                    {new Date(t.created_at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                  <span className="font-medium text-primary">
                    {formatRp(t.total_amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
