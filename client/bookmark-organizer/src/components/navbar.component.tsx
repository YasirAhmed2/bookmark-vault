/**
 * Navbar component.
 *
 * Shows "Dashboard" and "Logout" buttons and light/dark theme toggle button.
 * Calls props.logout() when the logout button is clicked.
 */

import { useNavigate } from "react-router";
import "./Navbar.css";
import ThemeToggle from "./darkthemeToogle.component";
interface Props {
  logout: () => void; 
}


export default function Navbar({ logout }: Props) {
  const navigate = useNavigate();

  return (
    <nav>
       <ThemeToggle />
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
