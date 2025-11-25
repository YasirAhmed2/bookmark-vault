
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Navbar from "../components/navbar.component.tsx";
import BookmarkForm from "../components/bookmarkForm.component.tsx";
import BookmarkList from "../components/bookmarkList.component.tsx";
import { type Bookmark } from "../types/index.t.ts";
import "./DashboardPage.css";

axios.defaults.withCredentials = true; // always send cookies

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

