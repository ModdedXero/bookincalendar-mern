import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../contexts/AuthContext";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    console.log(process.env.REACT_APP_PROJECT_ID);

    async function handleSubmit(e) {
        e.preventDefault();

        if (emailRef.current.value === "") {
            return setError("Email is required");
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
                    .then(usr => {
                        axios.post(`/api/login/signup`, { email: usr.user.email, uid: usr.user.uid } )
                            .then((res) => console.log(res.data.response))
                    });
            history.push("/private/calendar");
        } catch (err) {
            setError(err);
        }

        setLoading(false);
    }

    return (
        <div className="backdrop">
            <form className="login-form center" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {error && <div className="alert alert-danger">
                    <strong>{error}</strong>
                </div>}
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" ref={emailRef} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" minLength="8" required className="form-control" ref={passwordRef} placeholder="Password" />
                </div>
                <div className="form-group">
                    <label>Password Confirmation</label>
                    <input type="password" minLength="8" required className="form-control" ref={passwordConfirmRef} placeholder="Password" />
                </div>
                <div>
                    <button className="button" type="submit" disabled={loading}>Signup</button>
                    <p className="form-link">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    )
}