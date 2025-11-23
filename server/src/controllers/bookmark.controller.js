import { createBookmark, getBookmarksByUser, deleteBookmark } from "../models/bookmark.model.js";
import { validateBookmark } from "../utils/validation.js";

/**
 * Add a new bookmark for the authenticated user.
 *
 * Validates the incoming bookmark payload using `validateBookmark`. If the payload
 * is invalid, responds with HTTP 400 and an error message. On successful validation,
 * creates the bookmark via `createBookmark`, augmenting the payload with the
 * authenticated user's id (taken from `req.user._id`), and responds with the
 * created bookmark and a success message. Any unexpected errors are caught and
 * result in an HTTP 500 response.
 *
 * @async
 * @param {import('express').Request} req - Express request object. Expects:
 *   - req.body: bookmark payload to validate and create.
 *   - req.user._id: authenticated user's id (must be set by prior auth middleware).
 * @param {import('express').Response} res - Express response object used to send
 *   JSON responses:
 *   - 200: { msg: "Bookmark added", bookmark }
 *   - 400: { msg: "Invalid input" } when validation fails
 *   - 500: { msg: "Server error" } on unexpected failures
 * @returns {Promise<void>} Resolves after a response has been sent.
 * @see validateBookmark
 * @see createBookmark
 */
export const addBookmark = async (req, res) => {
  try {
    if (!validateBookmark(req.body))
      return res.status(400).json({ msg: "Invalid input" });

    const bookmark = await createBookmark({
      ...req.body,
      userId: req.user._id,
    });

    res.json({ msg: "Bookmark added", bookmark });
  } catch (err) {
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
