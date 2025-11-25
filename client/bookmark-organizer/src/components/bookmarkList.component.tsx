
import axios from "axios";
import { type Bookmark } from "../types/index.t";
import "./BookmarkList.css";

interface Props {
  bookmarks: Bookmark[];
  refresh: () => void;
}

export default function BookmarkList({ bookmarks, refresh }: Props) {
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
    <ul>
      {bookmarks.map((b) => (
        <li key={b._id}>
          <a href={b.url} target="_blank" rel="noopener noreferrer">
            {b.title}
          </a>
          <button onClick={() => handleDelete(b._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
