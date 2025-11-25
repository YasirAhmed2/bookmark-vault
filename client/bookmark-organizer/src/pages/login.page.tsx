import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * LoginPage component
 *
 * Displays a simple login form and handles authentication by sending the
 * entered credentials to the server. Uses controlled inputs for email and
 * password and navigates to the dashboard on successful login.
 *
 * Behavior:
 * - Maintains local state for `email` and `password` via React's useState.
 * - Uses a `handleSubmit` async handler that prevents the form's default
 *   submission, sends a POST request to "http://localhost:5000/auth/login"
 *   with `{ email, password }` in the request body and `{ withCredentials: true }`
 *   to allow cookies to be sent/received.
 * - On successful response, navigates to "/dashboard" using the router's
 *   navigation hook.
 * - On error, shows an alert containing the server-provided error message
 *   (if present) or a default "Login failed" message.
 *
 * UI:
 * - Renders two inputs:
 *   - Email (text input, controlled, required)
 *   - Password (password input, controlled, required)
 * - Renders a submit button that triggers authentication.
 * - Renders a clickable paragraph that navigates to "/register" for new users.
 *
 * Notes:
 * - The component expects the containing app to provide React Router context
 *   (useNavigate) and a running backend at the configured endpoint.
 * - Cookies are explicitly enabled by setting `withCredentials: true` on the
 *   axios POST request; ensure the server sets appropriate CORS and cookie
 *   attributes (e.g., Access-Control-Allow-Credentials, SameSite, Secure)
 *   when used across origins.
 *
 * @public
 * @returns React.ReactElement - The login form UI
 *
 * @example
 * <LoginPage />
 *
 * @remarks
 * - This component performs client-side navigation after a successful login.
 * - Consider replacing alert-based error handling with inline error UI for
 *   a better user experience.
 */
export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Make sure cookies are sent/received
      await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { withCredentials: true } // allow sending cookies
      );
     
      // console.log(email,password);
      navigate("/dashboard");
  
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p onClick={() => navigate("/register")}>Don't have an account? Register</p>
    </div>
  );
}
