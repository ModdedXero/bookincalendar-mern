import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileNavbar({ children }) {
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
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ zIndex: "99" }}>
                <a className="navbar-brand" href="/">Admin Page</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Calendar</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Notifications</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <button className="btn btn-info my-2 my-sm-0" onClick={handleLogout}>Sign Out</button>
                    </form>
                </div>
            </nav>
            {children}
        </>
    )
}
