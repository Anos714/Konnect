import type { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/auth.js";
import { UserModel } from "../models/User.model.js";
import type {
  loginRequest,
  loginResponse,
  registerRequest,
  registerResponse,
} from "../types/auth.js";
import { genrateTokenAndCookies } from "../middlewares/genearteTokenAndCookie.js";
import { AppError } from "../utils/AppError.js";

export const regsiterUser = async (
  req: Request<{}, {}, registerRequest>,
  res: Response<registerResponse>,
  next: NextFunction,
) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      throw new AppError(`${error.details[0]?.message}`, 400);
    }

    const { fullName, email, password } = value;
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new AppError("User already exists", 403);
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await UserModel.create({
      fullName,
      email,
      password,
      avatar: randomAvatar,
    });

    genrateTokenAndCookies(201, res, "User registered successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request<{}, {}, loginRequest>,
  res: Response<loginResponse>,
  next: NextFunction,
) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      throw new AppError(`${error.details[0]?.message}`, 400);
    }

    const { email, password } = value;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    genrateTokenAndCookies(200, res, "User Logged in successfully", user);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict" as "strict",
      secure: process.env.NODE_ENV === "production",
    };
    res.clearCookie("accessToken", {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.clearCookie("refreshToken", {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      msg: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
