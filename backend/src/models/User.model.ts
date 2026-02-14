import mongoose, { Document, Types, type ObjectId } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  bio?: string;
  nativeLang?: string;
  learningLang?: string;
  location?: string;
  isOnboarded: boolean;
  friends: Types.ObjectId[];
}

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
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
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

export const UserModel = mongoose.model<IUser>("User", UserSchema);
