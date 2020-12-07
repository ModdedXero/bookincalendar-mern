import React from "react";
import ReactDom from "react-dom";
import "../styles/modal.css";

export default function Modal({ open, children, onClose }) {
    if (!open) return null;

    return ReactDom.createPortal(
        <div className="modal-background" onContextMenu={(e) => {e.stopPropagation()}}>
            <div className="modal-content animate" onClick={(e) => {e.stopPropagation()}}>
                <button type="button" className="btn btn-outline-primary modal-close-btn" onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById("modalPortal")
    )
}
