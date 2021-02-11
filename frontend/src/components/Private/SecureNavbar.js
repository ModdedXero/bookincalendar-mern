import React, { useState } from "react";

import DynamicLink from "../Utility/DynamicLink";

export default function SecureNavbar({ component: Component }) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const toggleNav = () => {
        setIsNavCollapsed(!isNavCollapsed);
    }

    return (
        <>
            <nav className="navbar">
                <div className={`navbar-links ${isNavCollapsed ? "" : "active animate"}`}>
                    <DynamicLink className="navbar-link" to="/secure">Dashboard</DynamicLink>
                    <DynamicLink className="navbar-link" to="/secure/inspire">Inspire</DynamicLink>
                    <DynamicLink className="navbar-link" to="/secure/profile">Profile</DynamicLink>
                </div>
            </nav>
            <div className="site-content">
                <Component />
            </div>
        </>
    )
}