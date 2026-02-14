import { StreamChat } from "stream-chat";
import { AppError } from "../utils/AppError.js";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
if (!apiKey || !apiSecret) {
  throw new AppError("env varibales of stream chat are missing", 404);
}

export const streamClient = new StreamChat(apiKey, apiSecret);
