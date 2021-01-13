import React, { useState } from "react";

import DynamicLink from "../Utility/DynamicLink";

export default function SiteNavbar({ children, component: Component }) {
    const [activePage, setActivePage] = useState();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const toggleNav = () => {
        setIsNavCollapsed(!isNavCollapsed);
    }

    return (
        <>
            <nav className="navbar">
                <div
                    className={`navbar-links ${isNavCollapsed ? "" : "active"}`}
                >
                    <DynamicLink className="navbar-link" to="/" name="Home" activeName={activePage}>Home</DynamicLink>
                    <DynamicLink className="navbar-link" to="/ecourses" name="ECourses" activeName={activePage}>E-Courses</DynamicLink>
                    <DynamicLink className="navbar-link" to="/booking" name="Booking" activeName={activePage}>Booking</DynamicLink>
                    <DynamicLink className="navbar-link" to="/blog" name="Blog" activeName={activePage}>Blog</DynamicLink>
                    <DynamicLink className="navbar-link" to="/presets" name="Presets" activeName={activePage}>Presets</DynamicLink>
                </div>
                <button className="navbar-burger" onClick={toggleNav}><i className="fa fa-bars"></i></button>
            </nav>
            <div className="site-content">
                <Component setPage={setActivePage} />
            </div>
        </>
    )
}
