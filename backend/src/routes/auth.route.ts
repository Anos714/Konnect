import { Router } from "express";
import {
  loginUser,
  logoutUser,
  onboard,
  regsiterUser,
  userStatus,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", regsiterUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/onboarding", protectRoute, onboard);
router.get("/me", protectRoute, userStatus);

export default router;
