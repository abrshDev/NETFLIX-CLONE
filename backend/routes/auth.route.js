import express from "express";
import {
  authcheck,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { verifytoken } from "../middleware/verifytoken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authuser", verifytoken, authcheck);

export default router;
