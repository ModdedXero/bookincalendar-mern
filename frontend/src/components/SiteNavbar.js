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
                <Link className="navbar-logo" to="/">BOOKBEAT</Link>

                <ul className="navbar-nav">
                    <li>
                        <Link className="navbar-link" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/">Features</Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/">Pricing</Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/">About</Link>
                    </li>
                </ul>
                {currentUser == null ?
                <Link to="/login" className="button">Login</Link> :
                <Link to="/private/calendar" className="button">Admin Page</Link>}
            </nav>
            {children}
        </>
    )
}
