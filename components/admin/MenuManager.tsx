"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { formatRp } from "@/lib/menu-data";
import type { MenuItemRow } from "@/lib/menu-service";
import {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  type MenuItemInput,
} from "@/app/admin/actions";

type FormState = {
  category: string;
  name: string;
  hotPrice: string;
  icedPrice: string;
  singlePrice: string;
};

const emptyForm: FormState = {
  category: "",
  name: "",
  hotPrice: "",
  icedPrice: "",
  singlePrice: "",
};

function toInput(form: FormState): MenuItemInput {
  return {
    category: form.category,
    name: form.name,
    hotPrice: form.hotPrice ? Number(form.hotPrice) : null,
    icedPrice: form.icedPrice ? Number(form.icedPrice) : null,
    singlePrice: form.singlePrice ? Number(form.singlePrice) : null,
  };
}

function rowToForm(row: MenuItemRow): FormState {
  return {
    category: row.category,
    name: row.name,
    hotPrice: row.hot_price?.toString() ?? "",
    icedPrice: row.iced_price?.toString() ?? "",
    singlePrice: row.single_price?.toString() ?? "",
  };
}

function PriceFields({
  form,
  onChange,
}: {
  form: FormState;
  onChange: (form: FormState) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <input
        type="number"
        placeholder="Harga Hot"
        value={form.hotPrice}
        onChange={(e) => onChange({ ...form, hotPrice: e.target.value })}
        className="rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
      <input
        type="number"
        placeholder="Harga Iced"
        value={form.icedPrice}
        onChange={(e) => onChange({ ...form, icedPrice: e.target.value })}
        className="rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
      <input
        type="number"
        placeholder="Harga (single)"
        value={form.singlePrice}
        onChange={(e) => onChange({ ...form, singlePrice: e.target.value })}
        className="rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}

export function MenuManager({ items }: { items: MenuItemRow[] }) {
  const router = useRouter();
  const [addForm, setAddForm] = React.useState<FormState>(emptyForm);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<FormState>(emptyForm);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const grouped = categories.map((category) => ({
    category,
    rows: items.filter((item) => item.category === category),
  }));

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await createMenuItem(toInput(addForm));
    setPending(false);
    if (result.success) {
      setAddForm(emptyForm);
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  function startEdit(row: MenuItemRow) {
    setEditingId(row.id);
    setEditForm(rowToForm(row));
    setError(null);
  }

  async function handleSaveEdit(id: string) {
    setError(null);
    setPending(true);
    const result = await updateMenuItem(id, toInput(editForm));
    setPending(false);
    if (result.success) {
      setEditingId(null);
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Hapus "${name}" dari menu?`)) return;
    setError(null);
    setPending(true);
    const result = await deleteMenuItem(id);
    setPending(false);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleAdd}
        className="space-y-3 rounded-2xl border border-primary/10 bg-primary/5 p-5"
      >
        <h2 className="text-lg font-semibold text-primary">Tambah Menu Baru</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            list="category-options"
            required
            placeholder="Kategori (mis. Kopi)"
            value={addForm.category}
            onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
            className="rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <datalist id="category-options">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <input
            required
            placeholder="Nama item"
            value={addForm.name}
            onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            className="rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <PriceFields form={addForm} onChange={setAddForm} />
        <p className="text-xs text-foreground/50">
          Isi salah satu: Hot &amp; Iced (untuk minuman dengan varian), atau
          cukup Harga saja (untuk item satu harga seperti makanan).
        </p>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          Tambah
        </button>
      </form>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {grouped.length === 0 ? (
        <p className="text-sm text-foreground/60">Belum ada menu.</p>
      ) : (
        grouped.map(({ category, rows }) => (
          <div key={category}>
            <h2 className="mb-3 text-lg font-semibold text-primary">
              {category}
            </h2>
            <div className="divide-y divide-primary/10 rounded-2xl border border-primary/10 bg-primary/5">
              {rows.map((row) => (
                <div key={row.id} className="p-4">
                  {editingId === row.id ? (
                    <div className="space-y-2">
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input
                          list="category-options"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({ ...editForm, category: e.target.value })
                          }
                          className="rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                        <input
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                      </div>
                      <PriceFields form={editForm} onChange={setEditForm} />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(row.id)}
                          disabled={pending}
                          className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-50"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="rounded-full border border-primary/20 px-4 py-1.5 text-xs font-medium text-foreground/70"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-foreground">{row.name}</p>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-foreground/60">
                          {row.hot_price !== null && (
                            <span>Hot {formatRp(row.hot_price)}</span>
                          )}
                          {row.iced_price !== null && (
                            <span>Iced {formatRp(row.iced_price)}</span>
                          )}
                          {row.single_price !== null && (
                            <span>{formatRp(row.single_price)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <button
                          onClick={() => startEdit(row)}
                          className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row.id, row.name)}
                          disabled={pending}
                          className="font-medium text-destructive underline-offset-4 hover:underline disabled:opacity-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
