import express from "express";
import { registerUser, loginUser} from "../controllers/auth.controller.js";

/**
 * Express router that groups authentication-related routes and middleware.
 *
 * @constant {import("express").Router} authRouter
 *
 * @description
 * Router responsible for handling authentication and account-related endpoints such as
 * registration, login, logout, token refresh, email verification, and password reset.
 * Route-level middleware (validation, rate limiting, auth guards, etc.) is typically
 * applied here and requests are forwarded to controller/handler functions.
 *
 * Intended to be mounted on the main Express app, for example:
 *   app.use('/auth', authRouter);
 *
 * @example
 * // in your server entry
 * // const { authRouter } = require('./routers/auth.route');
 * // app.use('/auth', authRouter);
 *
 * @exports authRouter
 */
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
});


export default authRouter;
