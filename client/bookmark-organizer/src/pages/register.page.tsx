import { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import './RegisterPage.css';

/**
 * RegisterPage
 *
 * Renders a user registration form and handles client-side registration flow.
 *
 * The component maintains three pieces of local state:
 * - username: string — controlled input for the username field.
 * - email: string — controlled input for the email field.
 * - password: string — controlled input for the password field.
 *
 * Behavior:
 * - Renders a simple form with inputs for username, email, and password and a submit button.
 * - All inputs are required and are controlled via React's useState hook.
 * - Submitting the form calls an async handler (handleSubmit) with the form event (FormEvent).
 *
 * handleSubmit (async):
 * - Prevents the default form submission behavior.
 * - Sends a POST request to "http://localhost:5000/auth/register" with a JSON payload:
 *   { username, email, password }.
 * - On successful response, stores the returned token in localStorage under the "token" key.
 * - Navigates the user to the "/dashboard" route using the navigation hook (useNavigate).
 * - On error, displays an alert with a server-provided message when available, otherwise a fallback
 *   message of "Registration failed".
 *
 * Additional UI behavior:
 * - A clickable paragraph is provided to navigate back to the login page ("/") for users who
 *   already have an account.
 *
 * Side effects and external dependencies:
 * - Makes network requests using axios.
 * - Uses localStorage for persisting the authentication token.
 * - Relies on the react-router "navigate" function for client-side navigation.
 *
 * Notes / Considerations:
 * - The endpoint URL is hard-coded to "http://localhost:5000/auth/register"; consider moving to
 *   configuration for different environments.
 * - Error handling surfaces only a simple alert; you may want to show inline validation or use
 *   a more user-friendly notification system.
 * - No client-side validation beyond HTML required attributes is present; consider strengthening
 *   validation before sending credentials to the server.
 *
 * @returns {JSX.Element} A JSX element containing the registration form and related UI.
 */
export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", { username, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate("/")}>Already have an account? Login</p>
    </div>
  );
}
