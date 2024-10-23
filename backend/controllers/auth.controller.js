import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generatetoken } from "../utils/generatetoken.js";
export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    if (!emailregex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Email Format" });
    }
    const isuserexit = await User.findOne({ username });
    if (isuserexit) {
      return res
        .status(400)
        .json({ success: false, error: "username already taken" });
    }
    const isemailexit = await User.findOne({ email });
    if (isemailexit) {
      return res
        .status(400)
        .json({ success: false, error: "email already taken" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "password length cannot be less than 6",
      });
    }
    const profilepics = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = profilepics[Math.floor(Math.random() * profilepics.length)];
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const newuser = new User({
      username,
      email,
      image,
      password: hashpassword,
    });
    if (newuser) {
      generatetoken(newuser._id, res);
      await newuser.save();
      return res.status(201).json({
        success: true,
        user: {
          ...newuser._doc,
          password: "",
        },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "invalid user data" });
    }
  } catch (error) {
    console.log("error in sign up", error.message);
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, error: "provide both field" });

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "invalid credentials" });
    }

    const ispasscorrect = await bcrypt.compare(password, user.password);
    if (!ispasscorrect) {
      return res
        .status(400)
        .json({ success: false, error: "invalid credentials" });
    }
    generatetoken(user?._id, res);
    return res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in login ", error.message);
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    return res
      .status(200)
      .json({ success: true, message: "logged out succesfully" });
  } catch (error) {
    console.log("error in logout ", error.message);
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};
export const authcheck = async (req, res) => {
  const userid = req.user._id;

  try {
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log("error in authcheck ", error.message);
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};
