import mongoose from "mongoose";

/**
 * Mongoose schema for a User document.
 *
 * @typedef {Object} User
 * @property {string} username - Required. The user's display name.
 * @property {string} email - Required. Unique. The user's email address (used as login identifier).
 * @property {string} password - Required. The user's hashed password.
 *
 * @type {import('mongoose').Schema}
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User = mongoose.model("User", userSchema);
