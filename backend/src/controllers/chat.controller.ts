import type { RequestHandler } from "express";
import { generateStreamToken } from "../config/stream.js";
import type { Types } from "mongoose";

export const getStreamToken: RequestHandler = async (req, res, next) => {
  try {
    const token = generateStreamToken(req.user?._id as Types.ObjectId);
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
