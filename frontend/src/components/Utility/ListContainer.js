import React from "react";

import "../../styles/listcontainer.css";

export default function PageList({ children }) {
    return (
        <div className="x_list-container">
            {children}
        </div>
    )
}
