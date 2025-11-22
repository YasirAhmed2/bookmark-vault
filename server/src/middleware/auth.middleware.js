import jwt from "jsonwebtoken";

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
