/**
 * Represents a saved bookmark item.
 *
 * @remarks
 * Each Bookmark associates a unique identifier with a human-readable title and the target URL.
 *
 * @example
 * const bm: Bookmark = {
 *   _id: "507f1f77bcf86cd799439011",
 *   title: "MDN Web Docs",
 *   url: "https://developer.mozilla.org/"
 * };
 *
 * @property _id - Unique identifier for the bookmark (e.g., a database or ObjectId string).
 * @property title - The display title of the bookmark.
 * @property url - The destination URL that the bookmark points to.
 */
export interface Bookmark {
  _id: string;
  title: string;
  url: string;
}
