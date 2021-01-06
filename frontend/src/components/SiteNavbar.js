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
                <ListLink className="navbar-link" to="/" myIndex={1} index={currentIndex} setIndex={setCurrentIndex}>Home</ListLink>
                <ListLink className="navbar-link" to="/" myIndex={2} index={currentIndex} setIndex={setCurrentIndex}>Things We Do</ListLink>
                <ListLink className="navbar-link" to="/" myIndex={3} index={currentIndex} setIndex={setCurrentIndex}>Community</ListLink>
                <ListLink className="navbar-link" to="/" myIndex={4} index={currentIndex} setIndex={setCurrentIndex}>Submit</ListLink>
                <ListLink className="navbar-link" to="/" myIndex={4} index={currentIndex} setIndex={setCurrentIndex}>Follow Us</ListLink>
                <ListLink className="navbar-link" to="/" myIndex={4} index={currentIndex} setIndex={setCurrentIndex}>Blog</ListLink>
            </nav>
            {children}
        </>
    )
}
