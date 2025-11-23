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

    const user = await createUser({ username, email, password: hash });

    res.json({ msg: "Registered successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * Authenticates a user using email and password from the request body, issues a JWT, and sets it as a cookie.
 *
 * Workflow:
 * - Reads email and password from req.body.
 * - Looks up the user via findUserByEmail(email).
 * - Verifies the provided password against the stored hash using bcrypt.compare.
 * - On successful verification, signs a JWT with payload { userId: user._id } using process.env.JWT_SECRET
 *   with a 7-day expiration, sets a cookie named "token" containing the JWT, and responds with a success message
 *   and the userId.
 * - If the user is not found or the password does not match, responds with HTTP 400 and { msg: "Invalid credentials" }.
 * - On unexpected errors, responds with HTTP 500 and { msg: "Server error" }.
 *
 * @async
 * @function loginUser
 * @param {import("express").Request} req - Express request object. Expects req.body.email {string} and req.body.password {string}.
 * @param {import("express").Response} res - Express response object. Used to set cookie and send JSON responses.
 * @returns {Promise<void>} Sends an HTTP response (no value returned). On success: 200 with JSON { msg: "Login successful", userId }.
 * @see findUserByEmail
 * @see bcrypt.compare
 * @see jwt.sign
 */
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

    res.cookie("token", token);

    res.json({ msg: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
}
