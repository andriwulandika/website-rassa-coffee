import Link from "next/link";
import { logout } from "@/app/admin/actions";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/10 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="font-semibold tracking-tight">
              Rassa Coffee — Admin
            </span>
            <nav className="flex gap-4 text-sm">
              <Link
                href="/admin"
                className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                Kasir
              </Link>
              <Link
                href="/admin/laporan"
                className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                Laporan
              </Link>
              <Link
                href="/admin/menu"
                className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                Kelola Menu
              </Link>
            </nav>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-primary-foreground/30 px-4 py-1.5 text-sm transition-colors hover:bg-primary-foreground/10"
            >
              Keluar
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
