import React from "react";
import ReactDom from "react-dom";

export default function Modal({ open, children, onClose, small, error }) {
    if (!open) return null;

    return ReactDom.createPortal(
        <div className="modal-background" onContextMenu={(e) => {e.stopPropagation()}}>
            {error && <div className="modal-error alert alert-danger">{error}</div>}
            <div className={small ? "modal-content-sm animate" : "modal-content animate"} onClick={(e) => {e.stopPropagation()}}>
                <button type="button" className="button modal-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById("modalPortal")
    )
}
