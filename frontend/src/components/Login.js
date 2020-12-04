import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

import "../styles/form.css"

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { currentUser, login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);

            if (!error) {
                const user = {
                    id: currentUser.id,
                    email: emailRef.current.value
                }
    
                axios.post("http://localhost:3000/login/add", user)
                    .then(res => console.log(res.data))
            }       

            //history.push("/calendar");
        } catch {
            setError("Failed to sign in");
        }
        setLoading(false);
    }

    return (
        <div className="backdrop">
            <form className="login-form center" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <div className="alert alert-danger">
                    <strong>{error}</strong>
                </div>}
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" ref={emailRef} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" ref={passwordRef} placeholder="Password" />
                    <p className="form-link"><Link to="/forgot-password">Forgot Password?</Link></p>
                </div>
                <div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={loading}>Login</button>
                    <p className="form-link">Need an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </form>
        </div>
    )
}