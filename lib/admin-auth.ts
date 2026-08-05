import "server-only";

export const ADMIN_SESSION_COOKIE = "rassa_admin_session";

/**
 * Simple single-password gate for the internal admin/kasir area.
 * The cookie stores the admin password verbatim (httpOnly, not readable by
 * client JS) and is compared against ADMIN_PASSWORD on every request in
 * middleware.ts. This is intentionally simple (no per-user accounts) per
 * the chosen scope - fine for a small internal team sharing one password,
 * not intended for public-facing multi-user auth.
 */
export function isValidAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
