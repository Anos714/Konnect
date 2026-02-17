import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.model.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return next(new AppError("Unauthorized: Access token missing", 401));
    }

    if (!process.env.JWT_SECRET_ACCESS) {
      return next(new AppError("JWT secret env variable missing", 500));
    }

    interface JwtPayloadWithId extends jwt.JwtPayload {
      _id: string;
    }

    let decoded: JwtPayloadWithId;
    try {
      decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_ACCESS,
      ) as JwtPayloadWithId;
    } catch (err) {
      return next(new AppError("Unauthorized: Invalid token", 401));
    }

    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
