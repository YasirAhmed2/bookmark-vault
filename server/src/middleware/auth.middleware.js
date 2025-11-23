import jwt from "jsonwebtoken";

/**
 * Middleware that authenticates requests using a JWT stored in the "token" cookie.
 *
 * - Reads the JWT from req.cookies.token (cookie-parser must be used earlier).
 * - Verifies the token using process.env.JWT_SECRET via jwt.verify.
 * - On success, sets req.user to the decoded userId and calls next().
 * - On failure or missing token, responds with 401 and a JSON message ("Not Authorized" or "Invalid Token").
 *
 * @param {import('express').Request} req - Express request object. Expects cookies.token to contain a JWT.
 * @param {import('express').Response} res - Express response object used to send 401 responses on failure.
 * @param {import('express').NextFunction} next - Callback to pass control to the next middleware on success.
 * @returns {void} Sends a 401 response on failure; otherwise calls next().
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
