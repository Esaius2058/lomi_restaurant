import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

const SignUp = () => {
    // State for email, phone and password
    // initializing variables email, phone, password etc to store input
    // useState("") initializes the variables to an empty string
    const [email, setEmail] = useState(""); // email or phone
    const [name, setName] = useState(""); // name
    const [password, setPassword] = useState("");     // password input
    const [confPassword, setConfPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // toggle for password visibility
    const [showConfPassword, setShowConfPassword] = useState(false); // toggle for password visibility
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confPasswordError, setConfPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [error, setError] = useState("");

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const navigate = useNavigate();            // redirect function


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
        setError("");  // Clears previous errors before new validation

        const validateForm = () => {
            let valid = true;

            // Clear previous errors
            setEmailError("");
            setPasswordError("");
            setConfPasswordError("");
            setNameError("");
            setError("");

            if (!email) {
                setEmailError("Please enter your email.");
                valid = false;
            }

            if (!password) {
                setPasswordError("Please enter your password.");
                valid = false;
            }

            if (!confPassword) {
                setConfPasswordError("Please confirm your password.");
                valid = false;
            }

            if (!name) {
                setNameError("Please enter your name.");
                valid = false;
            }

            if (password && confPassword && password !== confPassword) {
                setError("Passwords do not match.");
                valid = false;
            }

            return valid;
            };

        if (!validateForm()) return;
        navigate("/")
    };

    return (
        <div className={`container ${theme}`}>
            <form onSubmit={handleSubmit} className="form-box">
                <h1>Sign Up</h1>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {setName(e.target.value)
                          if (!e.target.value) {
                            setNameError("Please enter your name.");
                          } else {
                            setNameError("");
                          }
                        }}
                        placeholder="John Doe"
                    />
                    {nameError && <div className="error-text">{nameError}</div>}
                </div>
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
                </div>
                <div className="password-wrapper">
                    <label>Confirm Password:</label>
                    <div className="password-field">
                        <input
                            type={showConfPassword ? "text" : "password"}
                            value={confPassword}
                            onChange={(e) => {
                              const value = e.target.value;
                              setConfPassword(value);
                              if (!value) {
                                setConfPasswordError("Please confirm your password.");
                              } else if (value !== password) {
                                setConfPasswordError("Passwords do not match.");
                              } else {
                                setConfPasswordError("");
                              }
                            }}

                            placeholder="Confirm Password"
                        />
                        {confPasswordError && <div className="error-text">{confPasswordError}</div>}
                        <span
                        className="eye-toggle"
                        onClick={() => setShowConfPassword(!showConfPassword)}
                        >
                            {showConfPassword ? "hide" : "show"} 
                        </span>
                    </div>
                    {error && <div className="error-text">{error}</div>}
                </div>
                
                <div className="button-wrapper">
                    <button type="submit">Sign up</button>
                </div>
                
                <div className="toggle-theme" onClick={toggleTheme}>
                    Switch to {theme === "dark" ? "Light" : "Dark"} Mode.
                </div>

                <div className="signup-link">
                    Have an account? <Link to="/auth/login">Login here</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;


