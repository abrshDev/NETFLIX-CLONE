import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const verifytoken = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    // console.log(decoded);
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }
    const user = await User.findById(decoded.userid).select("-password");
    req.user = user;
    next();
  } catch (error) {
    "error in verifytoken ", error.message;
  }
};
