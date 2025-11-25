import express from "express";
import { addBookmark, getMyBookmarks, removeBookmark } from "../controllers/bookmark.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


/**
 * Express Router for bookmark-related endpoints.
 *
 * Groups and exposes routes that perform bookmark operations such as
 * creating, reading, updating, and deleting bookmarks. Intended to be
 * mounted on the main Express application (for example: app.use('/bookmarks', bookmarkRouter)).
 *
 * Responsibilities:
 *  - Define route handlers for bookmark CRUD operations.
 *  - Apply bookmark-specific middleware (authentication, validation, rate limiting, etc.).
 *  - Keep bookmark routing concerns isolated from other route modules.
 *
 * @constant {import("express").Router} bookmarkRouter
 * @module routers/bookmark.route
 */
const bookmarkRouter = express.Router();

bookmarkRouter.post("/", authMiddleware, addBookmark);
bookmarkRouter.get("/", authMiddleware, getMyBookmarks);
bookmarkRouter.delete("/delete/:id", authMiddleware, removeBookmark);

export default bookmarkRouter;
