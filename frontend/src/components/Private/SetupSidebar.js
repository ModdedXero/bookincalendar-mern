import React from "react";
import { Link } from "react-router-dom";

import "../../styles/sidebar.css";

export default function Sidebar() {
    return (
        <nav className="x_sidenav">
            <Link className="x_navlink" to="/private/setup/sessions">Sessions</Link>
        </nav>
    )
}
