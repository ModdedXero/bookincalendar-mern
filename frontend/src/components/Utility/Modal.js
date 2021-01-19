import React from "react";
import ReactDom from "react-dom";

export default function Modal({ open, children, onClose, small, medium, error }) {
    if (!open) return null;

    const getModalClass = () => {
        if (small) {
            return "modal-content-sm animate";
        } else if (medium) {
            return "modal-content-md animate"
        } else {
            return "modal-content animate"
        }
    }

    return ReactDom.createPortal(
        <div className="modal-background" onContextMenu={(e) => {e.stopPropagation()}}>
            {error && <div className="modal-error alert alert-danger">{error}</div>}
            <div className={getModalClass()} onClick={(e) => {e.stopPropagation()}}>
                <button type="button" className="stripped-button modal-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById("modalPortal")
    )
}
