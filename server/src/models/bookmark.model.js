import { Bookmark } from "./bookmark.mongo.js";

/**
 * Create and persist a new Bookmark document.
 *
 * @async
 * @function createBookmark
 * @param {Object} data - The bookmark data to create. Should conform to the Bookmark schema (e.g., title, url, description, tags).
 * @returns {Promise<Object>} A promise that resolves to the saved Bookmark document.
 * @throws {Error} If saving the bookmark fails due to validation or database errors.
 */
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

