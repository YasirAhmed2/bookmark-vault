
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Navbar from "../components/navbar.component.tsx";
import BookmarkForm from "../components/bookmarkForm.component.tsx";
import BookmarkList from "../components/bookmarkList.component.tsx";
import { type Bookmark } from "../types/index.t.ts";
import "./DashboardPage.css";

axios.defaults.withCredentials = true; // always send cookies

/**
 * DashboardPage component
 *
 * Renders the authenticated user's bookmarks and provides controls to add new
 * bookmarks and log out. Manages bookmark data fetching, error handling, and
 * navigation for unauthorized access.
 *
 * Behavior:
 * - Maintains local state `bookmarks: Bookmark[]` to store fetched bookmarks.
 * - Uses `useNavigate` from react-router to redirect unauthenticated users to
 *   the login route ("/").
 * - Defines `fetchBookmarks` as a memoized async function (via `useCallback`)
 *   that:
 *   - Performs a GET request to "http://localhost:5000/bookmarks" to load
 *     bookmarks for the current user.
 *   - Updates `bookmarks` state with the server response.
 *   - On error (e.g., unauthorized), logs the error and navigates to the login page.
 * - Calls `fetchBookmarks` inside a `useEffect` to fetch bookmarks on component mount.
 * - Provides `handleLogout`, an async function that:
 *   - Sends a POST to "http://localhost:5000/auth/logout" to clear server-side session/cookie.
 *   - Regardless of request success or failure, clears local `bookmarks` state and navigates to the login page.
 *
 * Child component interactions:
 * - Renders a <Navbar /> and passes `handleLogout` as the `logout` prop.
 * - Renders a <BookmarkForm /> and a <BookmarkList /> and passes `fetchBookmarks`
 *   as a `refresh` callback to allow child components to trigger a bookmarks refresh.
 * - Supplies `bookmarks` state as a prop to <BookmarkList />.
 *
 * Notes:
 * - Uses axios for HTTP requests; endpoints are hard-coded to "http://localhost:5000".
 * - Navigation to "/" indicates an application-level decision to show the login page
 *   when authentication is missing or invalid.
 *
 * @returns {JSX.Element} The dashboard page JSX.
 */
export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const navigate = useNavigate();

  // Fetch bookmarks for current user
  const fetchBookmarks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/bookmarks");
      setBookmarks(res.data);
    } catch (err) {
      console.error("Fetch bookmarks error:", err.response?.data);
      navigate("/"); // unauthorized → back to login
    }
  }, [navigate]);

  // On component mount, fetch bookmarks
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout"); // backend clears cookie
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setBookmarks([]); // clear state immediately
      navigate("/");    // go to login
    }
  };

  return (
    <div className="page-container">
      <Navbar logout={handleLogout} />
      <h2>Your Bookmarks</h2>

      <BookmarkForm refresh={fetchBookmarks} />
      <BookmarkList bookmarks={bookmarks} refresh={fetchBookmarks} />
    </div>
  );
}

