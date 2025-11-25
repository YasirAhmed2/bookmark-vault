
import { useNavigate } from "react-router";
// import axios from "axios";
import "./Navbar.css";

interface Props {
  logout: () => void; // receive logout function from DashboardPage
}

export default function Navbar({ logout }: Props) {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
