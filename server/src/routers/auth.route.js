import express from "express";
import { registerUser, loginUser} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
});


export default authRouter;
