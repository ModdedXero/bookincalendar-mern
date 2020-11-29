import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../styles/form.css"

export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError("");

        try {
            await logout();
            history.push("/login")
        } catch {
            setError("Failed to logout")
        }
    }

    return (
        <div className="backdrop">
            <form className="login-form center">
                <h1>Dashboard</h1>
                {error && <div className="alert alert-danger">
                    <strong>{error}</strong>
                </div>}
                <div className="form-group">
                    <strong>Email: </strong> {currentUser.email}
                </div>
                <div>
                    <button className="btn btn-primary btn-lg btn-block">Update Profile</button>
                </div>
                <p className="form-link"><Link onClick={handleLogout}>Log out</Link></p>
            </form>
        </div>
    )
}