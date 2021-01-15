import React from "react";
import { Link } from "react-router-dom";

export default function ProfileNavbar({ children }) {
    return (
        <div className="site-content">
            <nav className="sidenav">
                <Link className="sidenav-link" to="/private/calendar">
                    <i className="ico far fa-calendar-alt"/>
                    Calendar
                </Link>
                <Link className="sidenav-link" to="/private/setup/sessions">
                    <i className="ico fas fa-camera"/>
                    Sessions
                </Link>
                <Link className="sidenav-link" to="/private/profile">
                    <i className="ico fas fa-user-cog" />
                    Profile
                </Link>
                <Link className="sidenav-link" to="/private/contracts">
                    <i className="ico fas fa-user-cog" />
                    Contracts
                </Link>

                <Link className="sidenav-logo" to="/">Bookbeat</Link>
            </nav>
            <div className="sidenav-content">
                {children}
            </div>
        </div>
    )
}
