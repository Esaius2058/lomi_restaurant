import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";
//import { LoginApi } from "../services/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    // State for email and password
    // initializing variables email, phone, password etc to store input
    // useState("") initializes the variables to an empty string
    const [email, setEmail] = useState(""); // email
    const [password, setPassword] = useState("");     // password input
    const [showPassword, setShowPassword] = useState(false); // toggle for password visibility
    const [error, setError] = useState("");    // error message 
    const [emailError, setEmailError] = useState("");    // error message 
    const [passwordError, setPasswordError] = useState("");    // error message 
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const navigate = useNavigate();            // redirect function
    const { login } = useAuth()

    // Check if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/")
        }
    }, [navigate]);

    // Toggle light/dark theme
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    // marked "async" because backend is "await"ing 
    const handleSubmit = async (e) => {
        e.preventDefault();   // Prevents the default reloading
        const validateForm = () => {
            let valid = true;
            setEmailError("");  // Clears previous errors before new validation
            setPasswordError("");  

            if (!email) {
                setEmailError("Please enter your email.");
                valid = false;
            }
            if (!password) {
                setPasswordError("Please enter your password.");
                valid = false;
            }

            return valid;
        };

        if (!validateForm()) return;

        const loginData = {password, email};

        const result = await login(loginData);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className={`container ${theme}`}>
            <form onSubmit={handleSubmit} className="form-box">
                <h1>Login</h1>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value)
                        if (!e.target.value) {
                            setEmailError("Please enter your email.");
                          } else {
                            setEmailError("");
                          }
                        }}
                        placeholder="example@gmail.com"
                    />
                    {emailError && <div className="error-text">{emailError}</div>}
                </div>
                <div className="password-wrapper">
                    <label>Password:</label>
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)
                              if (!e.target.value) {
                                setPasswordError("Please enter your password.");
                              } else {
                                setPasswordError("");
                              }
                            }}
                            placeholder="Password"
                        />
                        {passwordError && <div className="error-text">{passwordError}</div>}
                        <span
                        className="eye-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "hide" : "show"} 
                        </span>
                    </div>
                    {error && <div className="error-text">{error}</div>}
                </div>

                <div className="button-wrapper">
                    <button type="submit">Login</button>
                </div>
                <div className="toggle-theme" onClick={toggleTheme}>
                    Switch to {theme === "dark" ? "Light" : "Dark"} Mode.
                </div>

                <div className="signup-link">
                    Don't have an account? <Link to="/auth/signup">Sign up here</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;

