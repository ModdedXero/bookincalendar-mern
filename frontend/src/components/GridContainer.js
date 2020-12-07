import React from "react";
import "../styles/form.css";

export default function GridContainer({ children, single, double }) {
    function getClassName() {
        if (single) {
            return "component-grid-container-single";
        } else if (double) {
            return "component-grid-container-double";
        } else {
            return "component-grid-container-nth"
        }
    }

    return (
        <div className={getClassName()}>
            {children}
        </div>
    )
}
