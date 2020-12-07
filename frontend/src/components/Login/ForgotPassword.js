import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "../../styles/form.css"

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <div className="backdrop">
            <form className="login-form center" onSubmit={handleSubmit}>
                <h1>Password Reset</h1>
                {error && <div className="alert alert-danger">
                    <strong>{error}</strong>
                </div>}
                {message && <div className="alert alert-success">
                    <strong>{message}</strong>
                </div>}
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" ref={emailRef} placeholder="Enter email" />
                </div>
                <div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={loading}>Reset Password</button>
                </div>
                <p className="form-link"><Link to="/login/signup">Sign Up</Link> | <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}
