import React from "react";
import ReactDom from "react-dom";
import "../styles/modal.css";

export default function Modal({ open, children, onClose }) {
    if (!open) return null;

    return ReactDom.createPortal(
        <div className="modal-background">
            <div className="modal-content animate">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>,
        document.getElementById("modalPortal")
    )
}
