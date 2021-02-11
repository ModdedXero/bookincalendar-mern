import React, { useState } from "react";

import DynamicLink from "../Utility/DynamicLink";

export default function SiteNavbar({ component: Component }) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const toggleNav = () => {
        setIsNavCollapsed(!isNavCollapsed);
    }

    return (
        <>
            <nav className="navbar">
                <div className={`navbar-links ${isNavCollapsed ? "" : "active animate"}`}>
                    <DynamicLink className="navbar-link" to="/" root>Home</DynamicLink>
                    <DynamicLink className="navbar-link" to="/inspire" root>Inspire</DynamicLink>
                    <DynamicLink className="navbar-link" to="/create" root>Create</DynamicLink>
                    <DynamicLink className="navbar-link" to="/educate" root>Educate</DynamicLink>
                    <DynamicLink className="navbar-link" to="/submit" root>Submit</DynamicLink>
                </div>
                <button className="navbar-burger" onClick={toggleNav}><i className="fa fa-bars"></i></button>
            </nav>
            <div className="site-content">
                <Component />
            </div>
        </>
    )
}
