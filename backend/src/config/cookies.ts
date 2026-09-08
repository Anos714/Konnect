import type { CookieOptions } from "express";

const isSecureEnvironment =
  process.env.COOKIE_SECURE === "true" ||
  (process.env.COOKIE_SECURE !== "false" &&
    process.env.NODE_ENV !== "development");

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: isSecureEnvironment ? "none" : "lax",
  secure: isSecureEnvironment?true:false,
  path: "/",
};
