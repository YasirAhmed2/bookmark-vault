import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Navbar from "../components/navbar.component.tsx";
import BookmarkForm from "../components/bookmarkForm.component.tsx";
import BookmarkList from "../components/bookmarkList.component.tsx";
import { type Bookmark } from "../types/index.t.ts";
import './DashboardPage.css';

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const navigate = useNavigate();

  const fetchBookmarks = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");
    try {
      const res = await axios.get("http://localhost:5000/bookmarks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookmarks(res.data);
    } catch {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <div className="page-container">
      <Navbar />
      <h2>Your Bookmarks</h2>
      <BookmarkForm refresh={fetchBookmarks} />
      <BookmarkList bookmarks={bookmarks} refresh={fetchBookmarks} />
    </div>
  );
}
