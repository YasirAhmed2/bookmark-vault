import { useState, type FormEvent } from "react";
import axios from "axios";

// import { type Bookmark } from "../types/index.t.ts";
import './BookmarkForm.css';

interface Props {
  refresh: () => void;
}

export default function BookmarkForm({ refresh }: Props) {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    await axios.post("http://localhost:5000/bookmarks", { title, url }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTitle("");
    setUrl("");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" required />
      <button type="submit">Add Bookmark</button>
    </form>
  );
}
