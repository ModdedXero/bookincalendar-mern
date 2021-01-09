import React, { useState } from "react";

import DynamicLink from "../Utility/DynamicLink";

export default function SiteNavbar({ children, component: Component }) {
    const [activePage, setActivePage] = useState();

    return (
        <div className="site-content">
            <div className="sticky">
                <nav className="navbar">
                    <DynamicLink className="navbar-link" to="/" name="Home" activeName={activePage}>Home</DynamicLink>
                    <DynamicLink className="navbar-link" to="/ecourses" name="ECourses" activeName={activePage}>E-Courses</DynamicLink>
                    <DynamicLink className="navbar-link" to="/booking" name="Booking" activeName={activePage}>Booking</DynamicLink>
                    <DynamicLink className="navbar-link" to="/blog" name="Blog" activeName={activePage}>Blog</DynamicLink>
                    <DynamicLink className="navbar-link" to="/presets" name="Presets" activeName={activePage}>Presets</DynamicLink>
                </nav>
            </div>
            <Component setPage={setActivePage} />
        </div>
    )
}
