import { Bookmark } from "./bookmark.mongo.js";

export const createBookmark = (data) => Bookmark.create(data);

export const getBookmarksByUser = (userId) =>{
 Bookmark.find({ userId });
}
 

export const deleteBookmark = (bookmarkId, userId) =>{
 Bookmark.findOneAndDelete({ _id: bookmarkId, userId });
}
 
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

