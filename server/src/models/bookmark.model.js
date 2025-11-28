/**
 * Creates and saves a new bookmark.
 * @async
 * @param {Object} data - Bookmark info (title, url, etc.).
 * @returns {Promise<Object>} The created bookmark.
 * also fetches bookmarks by user and deletes bookmarks.
 */

import { Bookmark } from "./bookmark.mongo.js";

export const createBookmark = async (data) => {
  const bookmark = new Bookmark(data);
  return await bookmark.save(); // save and return
};


export const getBookmarksByUser = async (userId) => {
  return await Bookmark.find({ userId });
};

 

export const deleteBookmark = async (bookmarkId, userId) =>{
 return await Bookmark.findOneAndDelete({ _id: bookmarkId, userId });
}


 
export const getAllBookmarks = async () => {
  return await Bookmark.find({});
}

