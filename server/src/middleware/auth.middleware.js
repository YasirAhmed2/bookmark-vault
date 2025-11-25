import jwt from "jsonwebtoken";


/**
 * Express middleware that enforces authentication via a JWT stored in a cookie.
 *
 * Behavior:
 * - Reads the token from `req.cookies.token`.
 * - If no token is present, responds with HTTP 401 and `{ msg: "Not Authorized" }`.
 * - Verifies the token with `jwt.verify(token, process.env.JWT_SECRET)`.
 * - On successful verification, sets `req.user` to the decoded `userId` and calls `next()`.
 * - On verification failure, responds with HTTP 401 and `{ msg: "Invalid Token" }`.
 *
 * Notes:
 * - Requires cookie parsing middleware (e.g., `cookie-parser`) to populate `req.cookies`.
 * - Requires `process.env.JWT_SECRET` to be defined.
 *
 * @param {import('express').Request & { cookies?: Record<string, string>, user?: any }} req - Express request object; expects `req.cookies.token`.
 * @param {import('express').Response} res - Express response object, used to send 401 responses on failure.
 * @param {import('express').NextFunction} next - Express next function to continue request handling on success.
 * @returns {void}
 */
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};
