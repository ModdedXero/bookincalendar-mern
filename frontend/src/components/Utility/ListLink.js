import React from "react";
import { Link } from "react-router-dom";

export default function ListLink({ children, className, to, index, myIndex, setIndex = () => {} }) {
    const handleClick = () => {
        setIndex(myIndex);
    }

    return (
        <Link className={index === myIndex ? `${className} active` : `${className}`} onClick={handleClick} to={to}>
            {children}
        </Link>
    )
}
