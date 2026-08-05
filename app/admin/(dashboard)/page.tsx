"use client";

import * as React from "react";
import { menu, formatRp } from "@/lib/menu-data";
import { createTransaction, type CartItemInput } from "@/app/admin/actions";

type CartLine = CartItemInput & { key: string };

function lineKey(name: string, variant?: string) {
  return `${name}__${variant ?? "single"}`;
}

export default function KasirPage() {
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [status, setStatus] = React.useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "success"; total: number }
    | { state: "error"; message: string }
  >({ state: "idle" });

  function addItem(name: string, variant: string | undefined, price: number) {
    const key = lineKey(name, variant);
    setStatus({ state: "idle" });
    setCart((prev) => {
      const existing = prev.find((line) => line.key === key);
      if (existing) {
        return prev.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + 1 } : line
        );
      }
      return [...prev, { key, name, variant, price, quantity: 1 }];
    });
  }

  function decrementItem(key: string) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.key === key ? { ...line, quantity: line.quantity - 1 } : line
        )
        .filter((line) => line.quantity > 0)
    );
  }

  function removeItem(key: string) {
    setCart((prev) => prev.filter((line) => line.key !== key));
  }

  const total = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);

  async function handleCheckout() {
    setStatus({ state: "submitting" });
    const result = await createTransaction(
      cart.map(({ name, variant, price, quantity }) => ({
        name,
        variant,
        price,
        quantity,
      }))
    );

    if (result.success) {
      setStatus({ state: "success", total: result.total });
      setCart([]);
    } else {
      setStatus({ state: "error", message: result.error });
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-10">
        {menu.map(({ category, items }) => (
          <div key={category}>
            <h2 className="mb-3 text-lg font-semibold text-primary">
              {category}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-primary/10 bg-primary/5 p-4"
                >
                  <p className="font-medium text-foreground">{item.name}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.hot !== undefined && (
                      <button
                        onClick={() => addItem(item.name, "Hot", item.hot!)}
                        className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        + Hot {formatRp(item.hot)}
                      </button>
                    )}
                    {item.iced !== undefined && (
                      <button
                        onClick={() => addItem(item.name, "Iced", item.iced!)}
                        className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                      >
                        + Iced {formatRp(item.iced)}
                      </button>
                    )}
                    {item.price !== undefined && (
                      <button
                        onClick={() => addItem(item.name, undefined, item.price!)}
                        className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        + {formatRp(item.price)}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="h-fit rounded-2xl border border-primary/10 bg-primary/5 p-5 lg:sticky lg:top-8">
        <h2 className="text-lg font-semibold text-primary">Pesanan</h2>

        {cart.length === 0 ? (
          <p className="mt-4 text-sm text-foreground/60">
            Belum ada item. Klik menu di sebelah kiri untuk menambah.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {cart.map((line) => (
              <div key={line.key} className="flex items-center justify-between gap-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">
                    {line.name}
                    {line.variant ? ` (${line.variant})` : ""}
                  </p>
                  <p className="text-foreground/60">
                    {formatRp(line.price)} x {line.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementItem(line.key)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"
                    aria-label="Kurangi"
                  >
                    −
                  </button>
                  <span className="w-4 text-center">{line.quantity}</span>
                  <button
                    onClick={() => addItem(line.name, line.variant, line.price)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"
                    aria-label="Tambah"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(line.key)}
                    className="ml-1 text-xs text-destructive"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-primary/10 pt-4">
          <span className="font-medium text-foreground">Total</span>
          <span className="text-lg font-semibold text-primary">
            {formatRp(total)}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={cart.length === 0 || status.state === "submitting"}
          className="mt-4 w-full rounded-full bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {status.state === "submitting" ? "Menyimpan..." : "Selesaikan Transaksi"}
        </button>

        {status.state === "success" && (
          <p className="mt-3 text-sm text-primary">
            Transaksi tersimpan! Total {formatRp(status.total)}.
          </p>
        )}
        {status.state === "error" && (
          <p className="mt-3 text-sm text-destructive">{status.message}</p>
        )}
      </div>
    </div>
  );
}
