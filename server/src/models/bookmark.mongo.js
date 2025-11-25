import mongoose from "mongoose";

/**
 * Mongoose schema definition for a Bookmark document.
 *
 * @typedef {Object} Bookmark
 * @property {string} title - The bookmark's title. Required.
 * @property {string} url - The bookmark's URL. Required.
 * @property {import('mongoose').Types.ObjectId} userId - Reference to the owning User document's _id. Required.
 * @property {Date} createdAt - Creation timestamp (added by timestamps: true).
 * @property {Date} updatedAt - Last update timestamp (added by timestamps: true).
 */
const bookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
