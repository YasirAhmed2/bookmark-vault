/**
 * Navbar component.
 *
 * Shows "Dashboard" and "Logout" buttons.
 * Calls props.logout() when the logout button is clicked.
 */

import { useNavigate } from "react-router";
import "./Navbar.css";

interface Props {
  logout: () => void; 
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
