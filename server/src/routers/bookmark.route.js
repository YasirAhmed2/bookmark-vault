import express from "express";
import { addBookmark, getMyBookmarks, removeBookmark } from "../controllers/bookmark.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const bookmarkRouter = express.Router();

bookmarkRouter.post("/", authMiddleware, addBookmark);
bookmarkRouter.get("/", authMiddleware, getMyBookmarks);
bookmarkRouter.delete("/delete/:id", authMiddleware, removeBookmark);

export default bookmarkRouter;
