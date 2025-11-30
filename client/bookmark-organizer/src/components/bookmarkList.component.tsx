// /**
//  * BookmarkList component.
//  *
//  * Displays a list of bookmarks with links and delete, open and copy button.
//  * Calls props.refresh() after a bookmark is deleted.
//  */


import axios from "axios";
import { type Bookmark } from "../types/index.t.ts";
import "./bookmarkList.css";

interface Props {
  bookmarks: Bookmark[];
  refresh: () => void;
}

export default function BookmarkList({ bookmarks, refresh }: Props) {


  const handleOpen = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("URL copied!");
    } catch (err) {
      console.error("Copy error:", err);
    }
  };

    const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/bookmarks/delete/${id}`, {
        withCredentials: true,
      });

      refresh();
    } catch (error) {
      alert(error.response?.data?.msg || "Failed to delete bookmark");
    }
  };

  return (
    <div className="bookmark-list">
      {bookmarks.map((b) => (
        <div key={b._id} className="bookmark-item">

          <h3 className="bookmark-title" onClick={() => handleOpen(b.url)}>
            {b.title}
          </h3>

          <div className="bookmark-actions">

            <button className="copy-btn" onClick={() => handleCopy(b.url)}>
              Copy
            </button>

            <button className="delete-btn" onClick={() => handleDelete(b._id)}>
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}
 
