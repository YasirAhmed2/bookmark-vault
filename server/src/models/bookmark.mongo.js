/**
 * Mongoose schema for a Bookmark.
 *
 * Includes title, URL, and the user's ID.
 */

import mongoose from "mongoose";
const bookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
