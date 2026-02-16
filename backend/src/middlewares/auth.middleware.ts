import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.model.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    throw new AppError("Unauthorized access, Access token is missing", 401);
  }

  if (!process.env.JWT_SECRET_ACCESS) {
    throw new AppError("Access secret env varibale is missing", 404);
  }

  interface JwtPayloadWithId extends jwt.JwtPayload {
    _id: string;
  }

  const decoded = jwt.verify(
    accessToken,
    process.env.JWT_SECRET_ACCESS,
  ) as JwtPayloadWithId;

  if (!decoded) {
    throw new AppError("Unauthorized access, Inavlid token", 401);
  }

  const user = await UserModel.findById(decoded._id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  req.user = user;

  next();
};
