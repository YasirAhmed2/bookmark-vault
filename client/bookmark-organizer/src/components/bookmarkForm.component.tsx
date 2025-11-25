import { useState, type FormEvent } from "react";
import axios from "axios";
import "./BookmarkForm.css";

interface Props {
  refresh: () => void;
}

export default function BookmarkForm({ refresh }: Props) {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
 const normalizeUrl = (url: string) => {
  // If already starts with http:// or https:// — leave it
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

    try {
      await axios.post(
        "http://localhost:5000/bookmarks",
        { title, url: normalizeUrl(url) },
        { withCredentials: true }
      );

      setTitle("");
      setUrl("");
      refresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.msg || "Failed to add bookmark");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        required
      />
      <button type="submit">Add Bookmark</button>
    </form>
  );
}

