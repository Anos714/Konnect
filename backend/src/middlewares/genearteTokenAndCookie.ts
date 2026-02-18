import type { Response } from "express";
import jwt from "jsonwebtoken";
import type { IUser } from "../types/user.js";

export const genrateTokenAndCookies = (
  statusCode: number,
  res: Response,
  msg: string,
  user: IUser,
) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
    process.env.JWT_SECRET_ACCESS!,
    {
      expiresIn: "15m",
    },
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET_REFRESH!,
    {
      expiresIn: "7d",
    },
  );

  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as "lax",
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const { password, ...userData } = user;

  return res.status(statusCode).json({
    success: true,
    msg,
    user: userData,
  });
};
