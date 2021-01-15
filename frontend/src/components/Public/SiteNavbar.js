import React, { useState } from "react";

import DynamicLink from "../Utility/DynamicLink";

export default function SiteNavbar({ component: Component }) {
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
                    <DynamicLink className="navbar-link" to="/inspire" name="Inspire" activeName={activePage}>Inspire</DynamicLink>
                    <DynamicLink className="navbar-link" to="/create" name="Create" activeName={activePage}>Create</DynamicLink>
                    <DynamicLink className="navbar-link" to="/educate" name="Educate" activeName={activePage}>Educate</DynamicLink>
                    <DynamicLink className="navbar-link" to="/submit" name="Submit" activeName={activePage}>Submit</DynamicLink>
                </div>
                <button className="navbar-burger" onClick={toggleNav}><i className="fa fa-bars"></i></button>
            </nav>
            <div className="site-content">
                <Component setPage={setActivePage} />
            </div>
        </>
    )
}
