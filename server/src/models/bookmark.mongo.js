import mongoose from "mongoose";

/**
 * Mongoose schema definition for a Bookmark document.
 *
 * @typedef {Object} Bookmark
 * @property {string} title - Human-readable title for the bookmark.
 * @property {string} url - Destination URL of the bookmark.
 * @property {string} category - Category or label used to organize the bookmark.
 * @property {import('mongoose').Types.ObjectId} userId - ObjectId referencing the owning User document (ref: "User").
 */
const bookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  category: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
