import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileNavbar({ children }) {
    const [error, setError] = useState("");
    const [isNavCollapsed, setIsNavCollapsed] = useState(true)
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

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
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={isNavCollapsed ? "collapse navbar-collapse" : "navbar-collapse"} id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/calendar">Calendar</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/setup">Setup</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <button className="btn btn-info my-2 my-sm-0" onClick={handleLogout}>Sign Out</button>
                    </form>
                </div>
            </nav>
            {children}
        </>
    )
}
