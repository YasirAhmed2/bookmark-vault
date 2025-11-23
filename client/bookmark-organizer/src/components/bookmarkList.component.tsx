import axios from "axios";
import { type Bookmark } from "../types/index.t.ts";
import './BookmarkList.css';

interface Props {
  bookmarks: Bookmark[];
  refresh: () => void;
}

export default function BookmarkList({ bookmarks, refresh }: Props) {
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refresh();
  };

  return (
    <ul>
      {bookmarks.map(b => (
        <li key={b._id}>
          <a href={b.url} target="_blank" rel="noopener noreferrer">{b.title}</a>
          <button onClick={() => handleDelete(b._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
