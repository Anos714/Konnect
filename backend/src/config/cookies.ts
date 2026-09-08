import type { CookieOptions } from "express";

const isSecureEnvironment =
  process.env.COOKIE_SECURE === "true" ||
  (process.env.COOKIE_SECURE !== "false" &&
    process.env.NODE_ENV !== "development");

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: isSecureEnvironment ? "none" : "lax",
  secure: isSecureEnvironment,
  // CHIPS keeps cross-site Vercel -> Render auth cookies available without
  // relying on unrestricted third-party-cookie access.
  partitioned: isSecureEnvironment,
  path: "/",
};
