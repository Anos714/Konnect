import type { NextFunction, Request, Response } from "express";
import {
  loginSchema,
  onboardSchema,
  registerSchema,
} from "../validation/auth.js";
import { UserModel } from "../models/User.model.js";
import type {
  loginRequest,
  loginResponse,
  registerRequest,
  registerResponse,
} from "../types/auth.js";
import { genrateTokenAndCookies } from "../middlewares/genearteTokenAndCookie.js";
import { AppError } from "../utils/AppError.js";
import { upsertStreamUser } from "../config/stream.js";

export const regsiterUser = async (
  req: Request<{}, {}, registerRequest>,
  res: Response<registerResponse>,
  next: NextFunction,
) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      const message = error.details[0]?.message || "Validation failed";
      throw new AppError(message, 400);
    }

    const { fullName, email, password } = value;
    const user = await UserModel.findOne({ email }).select("+password");
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

    //stream client start
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.avatar,
      });
      console.log(`Stream user created for ${newUser._id}`);
    } catch (error) {
      console.error("Error creating stream user", error);
    }

    //stream client end

    const userObj = newUser.toObject();
    genrateTokenAndCookies(201, res, "User registered successfully", userObj);
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
      const message = error.details[0]?.message || "Validation failed";
      throw new AppError(message, 400);
    }

    const { email, password } = value;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }
    const userObj = user.toObject();
    genrateTokenAndCookies(200, res, "User Logged in successfully", userObj);
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

export const onboard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const { error, value } = onboardSchema.validate(req.body, {
      presence: "required",
    });

    if (error) {
      const message = error.details[0]?.message || "Validation failed";
      throw new AppError(message, 400);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...value,
        isOnboarded: true,
      },
      { returnDocument: "after" },
    );

    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    //stream client user updation start
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.avatar,
      });
      console.log("stream user updated at onboarding", updatedUser.fullName);
    } catch (error) {
      console.error("Error updating Stream user during onboarding", error);
    }

    //stream client user updation end

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const userStatus = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
