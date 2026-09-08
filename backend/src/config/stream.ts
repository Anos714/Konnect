import { StreamChat, type User } from "stream-chat";
import { AppError } from "../utils/AppError.js";
import type { Types } from "mongoose";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
if (!apiKey || !apiSecret) {
  throw new AppError("env varibales of stream chat are missing", 404);
}

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData: User) => {
  await streamClient.upsertUsers([userData]);
  return userData;
};

export const generateStreamToken = (userId: Types.ObjectId) => {
  const userIdStr = userId.toString();
  return streamClient.createToken(userIdStr);
};
