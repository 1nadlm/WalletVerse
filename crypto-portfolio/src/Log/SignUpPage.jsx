import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import logo from "../img/WalletVerseLogo.png";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const isPasswordValid = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    if (password.length < 8) {
      alert("Password needs at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (!isPasswordValid() || !isEmailValid()) return;
    console.log("Signing up with:", email, password);
    navigate("/dashboard");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <img src={logo} alt="WalletVerse Logo" className="signup-logo" />
        <h1 className="signup-title">Sign Up</h1>
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button className="signup-btn" onClick={handleSignUp}>
          Sign Up
        </button>
        <p className="signin-link">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
