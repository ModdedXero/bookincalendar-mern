import React from "react";
import { Link } from "react-router-dom";

export default function DynamicLink({ children, className, to, root }) {
    const getActiveName = () => {
        if (root) {
            return "/" + window.location.pathname.split("/")[1];
        } else {
            return window.location.pathname;
        }
    }

    return (
        <Link className={`${className} ${to === getActiveName() ? "active" : ""}`} to={to}>
            {children}
        </Link>
    )
}
