import { createBookmark, getBookmarksByUser, deleteBookmark } from "../models/bookmark.model.js";
import { validateBookmark } from "../utils/validation.js";


/**
 * Adds a bookmark for the authenticated user.
 *
 * Validates the incoming bookmark payload and, if valid, creates a bookmark
 * record associated with the authenticated user (from req.user). Responds
 * with JSON indicating success or the appropriate error status.
 *
 * @async
 * @param {import('express').Request} req - Express request object.
 *   - Expects bookmark data in req.body.
 *   - Expects authentication information in req.user (used as the bookmark's userId).
 * @param {import('express').Response} res - Express response object used to send JSON responses.
 * @returns {Promise<void>} Sends one of:
 *   - 400 with { msg: "Invalid input" } if validateBookmark(req.body) fails.
 *   - 200 with { msg: "Bookmark added", bookmark } on successful creation.
 *   - 500 with { msg: "Server error" } on unexpected errors (and logs req.user).
 */
export const addBookmark = async (req, res) => {
  try {
    if (!validateBookmark(req.body))
      return res.status(400).json({ msg: "Invalid input" });

    const bookmark = await createBookmark({
      ...req.body,
      userId: req.user,
    });

    res.json({ msg: "Bookmark added", bookmark });
  } catch (err) {
    console.log(req.user)
    res.status(500).json({ msg: "Server error" });
  }
};

export const getMyBookmarks = async (req, res) => {
  try {
    const bookmarks = await getBookmarksByUser(req.user);
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    await deleteBookmark(req.params.id, req.user);
    res.json({ msg: "Bookmark deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
