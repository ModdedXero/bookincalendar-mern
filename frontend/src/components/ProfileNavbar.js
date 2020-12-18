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
            <nav className="sidenav">
                <Link className="sidenav-link" to="/private/calendar">
                    <i className="ico far fa-calendar-alt"/>
                    Calendar
                </Link>
                <Link className="sidenav-link" to="/private/setup/sessions">
                    <i className="ico fas fa-camera"/>
                    Sessions
                </Link>
                <Link className="sidenav-link" to="/private/profile">
                    <i className="ico fas fa-user-cog" />
                    Profile
                </Link>

                <Link className="sidenav-logo" to="/">Bookbeat</Link>
            </nav>
            <div className="sidenav-content">
                {children}
            </div>
        </>
    )
}
