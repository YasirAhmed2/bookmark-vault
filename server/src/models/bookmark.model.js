import { Bookmark } from "./bookmark.mongo.js";

export const createBookmark = (data) => Bookmark.create(data);

export const getBookmarksByUser = (userId) =>{
 Bookmark.find({ userId });
}
 

export const deleteBookmark = (bookmarkId, userId) =>{
 Bookmark.findOneAndDelete({ _id: bookmarkId, userId });
}
 
/**
 * Update a bookmark document owned by a specific user.
 *
 * Finds a bookmark that matches the provided bookmarkId and userId and sets
 * the fields supplied in the data object. Resolves to the updated document
 * when the operation succeeds, or null if no matching document was found.
 *
 * @param {(string|import('mongoose').Types.ObjectId)} bookmarkId - The ID of the bookmark to update.
 * @param {(string|import('mongoose').Types.ObjectId)} userId - The ID of the user who must own the bookmark.
 * @param {Object} data - An object containing the fields to update (applied with $set).
 * @returns {Promise<Object|null>} A promise that resolves to the updated bookmark document, or null if not found.
 */
export const updateBookmark = (bookmarkId, userId, data) =>{
  Bookmark.findOneAndUpdate(
    { _id: bookmarkId, userId },
    { $set: data },
    { new: true }
  );
}

export const getBookmarkById = (bookmarkId, userId) =>{
 Bookmark.findOne({ _id: bookmarkId, userId });

}
 
export const getAllBookmarks = () => {
  Bookmark.find({});
}

