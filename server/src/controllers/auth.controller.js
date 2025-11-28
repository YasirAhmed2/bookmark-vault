/**
 * Logs in a user and sets a JWT cookie.
 * Checks email and password from req.body, issues a JWT if valid,
 * and responds with success or error JSON.
 * Also handles user registration and logout.
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.model.js";
import { validateRegister } from "../utils/validation.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!validateRegister(req.body)){
 return res.status(400).json({ msg: "Invalid input" });
    }
     

    const exists = await findUserByEmail(email);
    if (exists) {
      return res.status(400).json({ msg: "Email exists" })
    };

    const hash = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hash);

    const user = await createUser({ username, email, password: hash });
console.log("Created user: ", user);
    res.json({ msg: "Registered successfully", userId: user._id });
    
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match){

     return res.status(400).json({ msg: "Invalid credentials" });
    }


    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,

      { expiresIn: "7d" }
    );

  res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      msg: "Login successful",
      userId: user._id,
    });

    // res.cookie("token", token);

    // res.json({ msg: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
}
