
import axios from "axios";
import { type Bookmark } from "../types/index.t";
import "./BookmarkList.css";

interface Props {
  bookmarks: Bookmark[];
  refresh: () => void;
}

/**
 * BookmarkList
 *
 * Renders a list of bookmark items and provides the ability to delete individual bookmarks.
 *
 * Each bookmark is displayed as an anchor (<a>) that opens the target URL in a new tab
 * (using target="_blank" and rel="noopener noreferrer"). A "Delete" button next to each
 * item calls an internal handler that issues an HTTP DELETE request to remove the bookmark
 * from the server and then calls a provided refresh callback to update the parent state.
 *
 * Behavior details:
 * - The delete request is sent to: http://localhost:5000/bookmarks/delete/{id}
 * - The request includes credentials (withCredentials: true).
 * - On failure, an alert is shown with the server-provided message (if available) or a
 *   generic failure message.
 *
 * @param props.bookmarks - Array of bookmark objects to render. Each bookmark is expected to contain:
 *   - _id: string — unique identifier used as React key and to identify the resource to delete.
 *   - title: string — display text for the bookmark link.
 *   - url: string — href target for the bookmark link.
 *
 * @param props.refresh - Callback function invoked after a successful delete to allow the parent
 *   component to refresh its bookmarks (e.g., refetch from the server or update local state).
 *
 * @returns A JSX.Element representing an unordered list (<ul>) of bookmark list items (<li>).
 *
 * @remarks
 * - The component performs a side effect (network request) when deleting an item; ensure callers
 *   pass a refresh function that updates the UI appropriately.
 * - The server URL is hardcoded in the handler; consider extracting it to a config or environment
 *   variable for flexibility and to avoid leaking environment-specific values into the component.
 *
 * @example
 * <BookmarkList
 *   bookmarks={[{ _id: '1', title: 'MDN', url: 'https://developer.mozilla.org' }]}
 *   refresh={() => fetchBookmarks()}
 * />
 */
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
