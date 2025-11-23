import express from "express";
import { addBookmark, getMyBookmarks, removeBookmark } from "../controllers/bookmark.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

/**
 * Express Router instance responsible for handling bookmark-related endpoints.
 *
 * Intended to be mounted in the application (for example at `/bookmarks`) and
 * provides the typical CRUD routes for bookmark resources, e.g.:
 *   - GET    /           -> list bookmarks
 *   - POST   /           -> create a new bookmark
 *   - GET    /:id        -> retrieve a bookmark by id
 *   - PUT    /:id        -> update a bookmark by id
 *   - DELETE /:id        -> delete a bookmark by id
 *
 * This router may apply middleware such as authentication, request validation,
 * and error handling specific to bookmark operations.
 *
 * @constant {import('express').Router} bookmarkRouter
 */
const bookmarkRouter = express.Router();

bookmarkRouter.post("/", authMiddleware, addBookmark);
bookmarkRouter.get("/", authMiddleware, getMyBookmarks);
bookmarkRouter.delete("/delete/:id", authMiddleware, removeBookmark);

export default bookmarkRouter;
