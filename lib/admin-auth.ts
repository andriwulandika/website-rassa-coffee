import "server-only";

export const ADMIN_SESSION_COOKIE = "rassa_admin_session";

export type AdminRole = "owner" | "kasir";

/** Halaman yang boleh diakses tiap role. Kasir cuma boleh ke Kasir (POS). */
export const ROLE_ALLOWED_PATHS: Record<AdminRole, string[]> = {
  owner: ["/admin", "/admin/laporan", "/admin/menu"],
  kasir: ["/admin"],
};

/**
 * Gerbang password sederhana untuk area admin/kasir - dua password
 * (bukan per-user account), masing-masing dipetakan ke satu role tetap.
 * Cookie menyimpan password verbatim (httpOnly), lalu role-nya
 * ditentukan ulang setiap request dengan mencocokkan ke ADMIN_PASSWORD
 * (owner) atau KASIR_PASSWORD (kasir) - jadi role tidak pernah "dipercaya"
 * dari isi cookie begitu saja.
 */
export function getAdminRole(password: string): AdminRole | null {
  if (!password) return null;
  if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
    return "owner";
  }
  if (process.env.KASIR_PASSWORD && password === process.env.KASIR_PASSWORD) {
    return "kasir";
  }
  return null;
}

export function isPathAllowedForRole(role: AdminRole, pathname: string) {
  // Exact match only - semua path valid sudah didaftarkan eksplisit di
  // ROLE_ALLOWED_PATHS. Prefix match ("/admin/" dst) tidak dipakai karena
  // "/admin" sendiri adalah salah satu allowed path, dan itu akan otomatis
  // ikut mencocokkan "/admin/laporan" & "/admin/menu" lewat startsWith.
  return ROLE_ALLOWED_PATHS[role].includes(pathname);
}
