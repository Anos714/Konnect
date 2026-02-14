import bcrypt from "bcryptjs";
import type { NextFunction } from "express";
import mongoose, { Document, Types } from "mongoose";
import type { IUser } from "../types/user.js";

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      minLength: [3, "Full Name must be atleast 3 characters long"],
      maxLength: [30, "Full Name must not exceed 30 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    nativeLang: {
      type: String,
      default: "",
    },
    learningLang: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

//pre hooks
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
