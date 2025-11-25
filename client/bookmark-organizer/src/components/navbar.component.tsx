
import { useNavigate } from "react-router";
import "./Navbar.css";

interface Props {
  logout: () => void; 
}

/**
 * Navbar component that provides primary navigation actions for an authenticated area.
 *
 * Renders two buttons:
 * - "Dashboard" — navigates to "/dashboard" using React Router's `useNavigate`.
 * - "Logout" — invokes the provided `logout` callback.
 *
 * @param props.logout - Callback invoked when the "Logout" button is clicked. Expected to handle
 *                        sign-out logic (clearing auth state, tokens, and optional redirection).
 * @returns JSX.Element - A <nav> element containing "Dashboard" and "Logout" buttons.
 *
 * @remarks
 * - This component uses `useNavigate` from React Router; ensure it is rendered within a Router context.
 * - Consider enhancing accessibility (aria-labels, focus management) or using <a> elements if semantic
 *   navigation is required for SEO or assistive technologies.
 */
export default function Navbar({ logout }: Props) {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
