import React, { useState } from "react";

import ListLink from "./Utility/ListLink";

export default function ProfileNavbar({ children }) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true)

    // TODO: Setup and collapsed Profile Navbar
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <>
            <nav className="sidenav">
                <ListLink className="sidenav-link" to="/private/calendar" myIndex={1} index={currentIndex} setIndex={setCurrentIndex}>
                    <i className="ico far fa-calendar-alt"/>
                    Calendar
                </ListLink>
                <ListLink className="sidenav-link" to="/private/setup/sessions" myIndex={2} index={currentIndex} setIndex={setCurrentIndex}>
                    <i className="ico fas fa-camera"/>
                    Sessions
                </ListLink>
                <ListLink className="sidenav-link" to="/private/profile" myIndex={3} index={currentIndex} setIndex={setCurrentIndex}>
                    <i className="ico fas fa-user-cog" />
                    Profile
                </ListLink>

                <ListLink className="sidenav-logo" to="/">Bookbeat</ListLink>
            </nav>
            <div className="sidenav-content">
                {children}
            </div>
        </>
    )
}
