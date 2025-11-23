import mongoose from "mongoose";

/**
 * Mongoose schema for a User document.
 *
 * @typedef {Object} User
 * @property {string} username - The user's display name. Required.
 * @property {string} email - The user's email address. Required and unique.
 * @property {string} password - The user's hashed password. Required.
 *
 * @type {import('mongoose').Schema<User>}
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User = mongoose.model("User", userSchema);
