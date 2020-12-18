import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SiteNavbar({ children }) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true)
    const { currentUser } = useAuth();

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <>
            <nav className="navbar">
                <Link className="navbar-logo" to="/">Bookbeat</Link>

                <div>
                    <Link className="navbar-link" to="/">Home</Link>
                    <Link className="navbar-link" to="/">Features</Link>
                    <Link className="navbar-link" to="/">Pricing</Link>
                    <Link className="navbar-link" to="/">About</Link>
                </div>

                {currentUser == null ?
                <Link to="/login" className="button">Login</Link> :
                <Link to="/private/calendar" className="button">Profile</Link>}
            </nav>
            {children}
        </>
    )
}
