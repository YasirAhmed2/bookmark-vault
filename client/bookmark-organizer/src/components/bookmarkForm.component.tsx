import { useState, type FormEvent } from "react";
import axios from "axios";
import "./BookmarkForm.css";

interface Props {
  refresh: () => void;
}

/**
 * BookmarkForm component
 *
 * Renders a simple form to create a new bookmark with a title and URL. The form
 * manages its own local state for title and URL, normalizes the URL before
 * submission (ensuring an "https://" scheme is present unless "http://" or
 * "https://" is already provided), and sends a POST request to the backend to
 * create the bookmark.
 *
 * @param props - Component props.
 * @param props.refresh - Callback invoked after a successful bookmark creation
 *   to allow the parent to refresh its list of bookmarks.
 *
 * @returns JSX.Element - A form element with controlled inputs for title and URL
 *   and a submit button.
 *
 * @remarks
 * - Submission is handled asynchronously. The default form submission is
 *   prevented via FormEvent handling.
 * - The component uses axios to POST to "http://localhost:5000/bookmarks"
 *   with { withCredentials: true } to include credentials (cookies).
 * - On success, the form inputs are cleared and props.refresh() is called.
 * - On failure, an alert is shown with the server-provided message if
 *   available, otherwise a default error message is displayed.
 */
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
   
    } catch (error) {
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

