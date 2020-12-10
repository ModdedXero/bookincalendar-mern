import React from "react";
import "../styles/form.css";

export default function GridContainer({ children, single, double, triple, triple_nth }) {
    function getClassName() {
        if (single) {
            return "component-grid-container-single";
        } else if (double) {
            return "component-grid-container-double";
        } else if (triple) {
            return "component-grid-container-triple"
        } else if (triple_nth) {
            return "component-grid-container-triple-nth"
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
