import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import ListLink from "./Utility/ListLink";

export default function SiteNavbar({ children }) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true)
    const { currentUser } = useAuth();
    
    // TODO: Setup and collapsed Site Navbar
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <>
            <nav className="navbar">
                <ListLink className="navbar-logo" to="/">Bookbeat</ListLink>

                <div>
                    <ListLink className="navbar-link" to="/" myIndex={1} index={currentIndex} setIndex={setCurrentIndex}>Home</ListLink>
                    <ListLink className="navbar-link" to="/" myIndex={2} index={currentIndex} setIndex={setCurrentIndex}>Features</ListLink>
                    <ListLink className="navbar-link" to="/" myIndex={3} index={currentIndex} setIndex={setCurrentIndex}>Pricing</ListLink>
                    <ListLink className="navbar-link" to="/" myIndex={4} index={currentIndex} setIndex={setCurrentIndex}>About</ListLink>
                </div>

                {currentUser == null ?
                <ListLink to="/login" className="button">Login</ListLink> :
                <ListLink to="/private/calendar" className="button">Profile</ListLink>}
            </nav>
            {children}
        </>
    )
}
