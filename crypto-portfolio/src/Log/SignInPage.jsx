import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";
import logo from "../img/WalletVerseLogo.png";

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = () => {
        console.log("Signing in with:", email, password);
        navigate("/dashboard");
    };

    const handleCreateAccount = () => {
        navigate("/signup");
    };

    return (
        <div className="signin-page">
            <div className="signin-container">
                <img src={logo} alt="WalletVerse Logo" className="signin-logo" />
                <h1 className="signin-title">Sign In</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="signin-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="signin-input"
                />
                <button onClick={handleSignIn} className="signin-btn">
                    Sign In
                </button>
                <button onClick={handleCreateAccount} className="signup-btn">
                    Create Account
                </button>
            </div>
        </div>
    );
}

export default SignInPage;
