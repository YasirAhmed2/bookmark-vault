import express from "express";
import { registerUser, loginUser} from "../controllers/auth.controller.js";

/**
 * Router instance that groups authentication-related HTTP endpoints.
 *
 * Provides routes for user authentication flows such as:
 *  - registration (sign up)
 *  - login (sign in)
 *  - logout
 *  - token refresh
 *  - email verification and password reset (if implemented)
 *
 * Responsibilities:
 *  - wires route paths to authentication controller handlers
 *  - applies request validation and authentication middleware (e.g. input validators, rate limiting, JWT/session checks)
 *  - forwards errors to the central error handler and ensures consistent response shapes
 *  - typically mounted on a path like '/auth' in the main application (e.g. app.use('/auth', authRouter))
 *
 * Implementation notes:
 *  - This is an Express Router instance created via express.Router().
 *  - Route handlers should be implemented as async-safe controllers and kept thin (business logic in services).
 *  - Security-sensitive operations (passwords, tokens) should use appropriate hashing, cookie flags, and secure token storage.
 *
 * @constant
 * @type {import("express").Router}
 * @name authRouter
 * @example
 * // mount in your app
 * // const app = express();
 * // app.use('/auth', authRouter);
 */
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
});


export default authRouter;
