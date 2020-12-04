import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
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
                <Link className="navbar-brand" to="/">Admin Page</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={isNavCollapsed ? "collapse navbar-collapse" : "navbar-collapse"} id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/calendar">Calendar</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/setup">Setup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
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
