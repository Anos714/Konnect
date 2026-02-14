import { Router } from "express";
import {
  loginUser,
  logoutUser,
  regsiterUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", regsiterUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
