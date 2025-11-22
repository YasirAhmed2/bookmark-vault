import { createBookmark, getBookmarksByUser, deleteBookmark } from "../models/bookmark.model.js";
import { validateBookmark } from "../utils/validation.js";

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
