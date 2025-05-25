import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

const Login = () => {
    // State for email, phone and password
    // initializing variables email, phone, password etc to store input
    // useState("") initializes the variables to an empty string
    const [identifier, setIdentifier] = useState(""); // email or phone
    const [password, setPassword] = useState("");     // password input
    const [showPassword, setShowPassword] = useState(false); // toggle for password visibility
    const [error, setError] = useState("");    // error message 
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const navigate = useNavigate();            // redirect function


    // Check if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/home")
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
        setError("");  // Clears previous errors before new validation

        // Check if at least email or phone is provided
        if (!identifier || !password) {
            setError("Please enter your email or phone number, and password.");
            return;
        }

        const loginData = {password, identifier};

        try {
            const response = await fetch("https://your-api.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("token_expiry", Date.now() + 3600 * 1000);
                navigate("/home")
            } else {
                console.error(data.message)
                setError("Login failed");

            }
        } catch (err) {
            console.error(err)
            setError("Something went wrong :(");
        }
    };

    return (
        <div className={`container ${theme}`}>
            <form onSubmit={handleSubmit} className="form-box">
                <h1>Login</h1>
                <div>
                    <label>Email or Phone:</label>
                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Email or Phone"
                    />
                </div>
                <div className="password-wrapper">
                    <label>Password:</label>
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <span
                        className="eye-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "hide" : "show"} 
                        </span>
                    </div>
                </div>

                <button type="submit">Login</button>
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

