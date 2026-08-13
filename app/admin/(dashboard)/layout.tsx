import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "@/app/admin/actions";
import { ADMIN_SESSION_COOKIE, getAdminRole } from "@/lib/admin-auth";

const navLinks = [
  { href: "/admin", label: "Kasir", ownerOnly: false },
  { href: "/admin/laporan", label: "Laporan", ownerOnly: true },
  { href: "/admin/menu", label: "Kelola Menu", ownerOnly: true },
];

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const role = session ? getAdminRole(session) : null;
  const isOwner = role === "owner";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/10 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="font-semibold tracking-tight">
              Rassa Coffee — Admin
            </span>
            <nav className="flex gap-4 text-sm">
              {navLinks
                .filter((link) => !link.ownerOnly || isOwner)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent">
              {isOwner ? "Owner" : "Kasir"}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-primary-foreground/30 px-4 py-1.5 text-sm transition-colors hover:bg-primary-foreground/10"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
