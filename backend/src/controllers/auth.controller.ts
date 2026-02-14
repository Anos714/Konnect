import type { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/auth.js";
import { UserModel } from "../models/User.model.js";
import type { loginRequest, loginResponse } from "../types/auth.js";
import { genrateTokenAndCookies } from "../middlewares/genearteTokenAndCookie.js";
import bcrypt from "bcryptjs";

export const regsiterUser = async (
  req: Request<{}, {}, loginRequest>,
  res: Response<loginResponse>,
  next: NextFunction,
) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details[0]?.message,
      });
    }

    const { fullName, email, password } = value;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(403);
      throw new Error("User already exists");
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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details[0]?.message,
      });
    }

    const { email, password } = value;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(403);
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(403);
      throw new Error("Invalid credentials");
    }

    genrateTokenAndCookies(200, res, "User Logged in successfully", user);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    next(error);
  }
};
