import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SiteNavbar({ children }) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true)
    const { currentUser } = useAuth();

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ zIndex: "99" }}>
                <Link className="navbar-brand" to="/">Booking</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={isNavCollapsed ? "collapse navbar-collapse" : "navbar-collapse"} id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Features</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        {currentUser == null ?
                        <Link to="/login" className="btn btn-info my-2 my-sm-0">Login</Link> :
                        <Link to="/calendar" className="btn btn-info my-2 my-sm-0">Admin Page</Link>}
                    </form>
                </div>
            </nav>
            {children}
        </>
    )
}
