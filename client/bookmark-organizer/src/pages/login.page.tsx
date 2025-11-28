/**
 * LoginPage
 * Shows a login form with email and password inputs.
 * Sends credentials to the server and navigates to "/dashboard" on success.
 */

import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


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
