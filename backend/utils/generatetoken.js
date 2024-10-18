import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
export const generatetoken = async (userid, res) => {
  const token = jwt.sign({ userid }, ENV_VARS.JWT_SECRET, {
    expiresIn: "15d",
  });

  return res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //ms,
    httpOnly: true, //prevent xss attacks  cross-site  scripting attacks
    sameSite: "strict", //csrf attacks cross-site
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
