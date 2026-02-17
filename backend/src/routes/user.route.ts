import { Router } from "express";
import {
  acceptFriendRequest,
  getFriendRequest,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.post("/friend-request/:id/accept", acceptFriendRequest);
router.post("/friend-request/:id/reject", rejectFriendRequest);
router.get("/friend-request", getFriendRequest);
router.get("/outgoing-friend-request", getOutgoingFriendReqs);

export default router;
