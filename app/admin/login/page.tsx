import type { Metadata } from "next";
import { login } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin Login | Rassa Coffee",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string; next?: string };
}) {
  const hasError = searchParams.error === "1";
  const next = searchParams.next ?? "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-6">
      <form
        action={login}
        className="w-full max-w-sm rounded-3xl bg-background p-8 shadow-xl"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-primary">
          Admin Rassa Coffee
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          Masukkan password untuk masuk ke kasir & laporan.
        </p>

        <input type="hidden" name="next" value={next} />

        <label className="mt-6 block text-sm font-medium text-foreground/80">
          Password
        </label>
        <input
          type="password"
          name="password"
          autoFocus
          required
          className="mt-2 w-full rounded-lg border border-primary/20 bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
        />

        {hasError && (
          <p className="mt-3 text-sm text-destructive">
            Password salah. Coba lagi.
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Masuk
        </button>
      </form>
    </main>
  );
}
