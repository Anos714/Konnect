import mongoose from "mongoose";
import type { IFriend } from "../types/user.js";

const FriendRequestSchema = new mongoose.Schema<IFriend>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const FriendRequestModel = mongoose.model<IFriend>(
  "FriendRequest",
  FriendRequestSchema,
);
