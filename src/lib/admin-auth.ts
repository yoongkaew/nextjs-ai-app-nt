// src/lib/admin-auth.ts
// Server-only auth guard for the admin area.
// (Imports next/headers, so it can only ever run on the server.)
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * Ensures the current request belongs to an authenticated admin.
 *
 * The User model has no `role` column yet, so "admin" is defined by an
 * allowlist of emails in the `ADMIN_EMAILS` env var (comma-separated).
 * If `ADMIN_EMAILS` is unset, any signed-in user is allowed — convenient
 * for local dev, but set the allowlist before deploying.
 *
 * Redirects to /login when unauthenticated, or to the storefront when the
 * user is signed in but not on the allowlist.
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowlist.length > 0 && !allowlist.includes(session.user.email.toLowerCase())) {
    redirect("/");
  }

  return session;
}
