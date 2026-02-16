import { StreamChat, type User } from "stream-chat";
import { AppError } from "../utils/AppError.js";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
if (!apiKey || !apiSecret) {
  throw new AppError("env varibales of stream chat are missing", 404);
}

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData: User) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("error creating stream user");
  }
};

export const generateStreamToken = (userId: string) => {};
