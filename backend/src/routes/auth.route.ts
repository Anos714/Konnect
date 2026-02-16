import { Router } from "express";
import {
  loginUser,
  logoutUser,
  onboard,
  regsiterUser,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", regsiterUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/onboarding", protectRoute, onboard);

export default router;
