import React from "react";
import { Link } from "react-router-dom";

export default function DynamicLink({ children, className, to, name, activeName }) {
    return (
        <Link className={`${className} ${name === activeName ? "active" : ""}`} to={to}>
            {children}
        </Link>
    )
}
