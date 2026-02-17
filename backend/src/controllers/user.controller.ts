import type { Request, Response, NextFunction, RequestHandler } from "express";
import { Types } from "mongoose";
import { UserModel } from "../models/User.model.js";
import { AppError } from "../utils/AppError.js";
import { FriendRequestModel } from "../models/FriendRequest.model.js";
import type { IFriend } from "../types/user.js";

export const getRecommendedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }
    const currentUserId = req.user._id;
    const currentUser = req.user;
    const recommendedUser = await UserModel.find({
      _id: { $ne: currentUserId, $nin: currentUser.friends },
      isOnboarded: true,
    });

    return res.status(200).json({
      success: true,
      users: recommendedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyFriends = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const userFriends = await UserModel.findById(userId)
      .select("friends")
      .populate("friends");
    return res.status(200).json({
      success: true,
      user: userFriends,
    });
  } catch (error) {
    next(error);
  }
};

export const sendFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("User is not authenticated", 401);
    }
    const userId = req.user._id;
    const receiverId = new Types.ObjectId(req.params.id as string);
    if (userId.toString() === receiverId.toString()) {
      throw new AppError("You cannot send a friend request to yourself", 400);
    }
    const receiver = await UserModel.findById(receiverId);
    if (!receiver) {
      throw new AppError("Receiver not found", 404);
    }

    if (receiver.friends?.includes(userId)) {
      throw new AppError("You are already friends with this user", 400);
    }

    const existingRequest = await FriendRequestModel.findOne({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    } as any);

    if (existingRequest) {
      throw new AppError(
        "A friend request already exists between you and this user",
        400,
      );
    }
    const friendRequest = await FriendRequestModel.create({
      sender: userId,
      receiver: receiverId,
    });

    return res.status(201).json({
      success: true,
      request: friendRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const acceptFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequestModel.findById(requestId);
    if (!friendRequest) {
      throw new AppError("Friend request not found", 404);
    }

    if (friendRequest.receiver.toString() !== req.user?._id.toString()) {
      throw new AppError("You are unauthorized to do that task", 401);
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    await UserModel.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.receiver },
    });

    await UserModel.findByIdAndUpdate(friendRequest.receiver, {
      $addToSet: { friends: friendRequest.sender },
    });

    return res.status(200).json({
      success: true,
      msg: "Friend request accepted",
    });
  } catch (error) {
    next(error);
  }
};

export const getFriendRequest: RequestHandler = async (req, res, next) => {
  try {
    const incomingReqs = await FriendRequestModel.find({
      receiver: req.user?._id,
      status: "pending",
    }).populate("sender", "fullName avatar nativeLang learningLang");

    const acceptedReqs = await FriendRequestModel.find({
      sender: req.user?._id,
      status: "accepted",
    }).populate("receiver", "fullName avatar");

    return res.status(200).json({
      success: true,
      incomingReqs,
      acceptedReqs,
    });
  } catch (error) {
    next(error);
  }
};

export const getOutgoingFriendReqs: RequestHandler = async (req, res, next) => {
  try {
    const outgoingReqs = await FriendRequestModel.find({
      sender: req.user?._id,
      status: "pending",
    }).populate("receiver", "fullName avatar nativeLang learningLang");

    return res.status(200).json({
      success: true,
      outgoingReqs,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequestModel.findById(requestId);
    if (!friendRequest) {
      throw new AppError("Friend request not found", 404);
    }

    if (friendRequest.receiver.toString() !== req.user?._id.toString()) {
      throw new AppError("You are unauthorized to do that task", 401);
    }
    await friendRequest.deleteOne();
    return res.status(200).json({
      success: true,
      msg: "Friend request rejeceted",
    });
  } catch (error) {
    next(error);
  }
};
