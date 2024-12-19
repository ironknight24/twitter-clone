import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      email,
    });

    if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        
        return res.json({
            _id: newUser._id,
            username: newUser.username,
            fullName: newUser.fullName,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImage: newUser.profileImage,
            coverImage: newUser.coverImage,
        });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in server" });
  }
};

export const login = async (req, res) => {
  res.json({ message: "Login page" });
};

export const logout = async (req, res) => {
  res.json({ message: "Logout page" });
};
