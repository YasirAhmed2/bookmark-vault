import mongoose from "mongoose";

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
