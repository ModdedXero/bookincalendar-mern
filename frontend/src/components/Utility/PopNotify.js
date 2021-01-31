import React, { useState } from "react";
import ReactDom from "react-dom";

export default function PopNotify({ children, icon, onSubmit, complete }) {
    const [isVisible, setIsVisible] = useState(false);
    
    if (isVisible && !complete) {
        return ReactDom.createPortal(
            <div className="pop-background animate" onContextMenu={(e) => {e.stopPropagation()}}>
                <form className="pop-form" onSubmit={onSubmit} onClick={(e) => {e.stopPropagation()}}>
                    <button 
                        type="button" 
                        className="stripped-button modal-button" 
                        onClick={e => setIsVisible(false)} 
                    >
                        <i className="far fa-times-circle" />
                    </button>
                    {children}
                </form>
            </div>,
            document.getElementById("notifyPortal")
        )
    } else {
        return (
            <div className="pop-open-btn animate">
                <button onClick={e => {complete ? setIsVisible(false) : setIsVisible(true)}}>
                    <i className={complete ? "fas fa-check" : icon} />
                </button>
            </div>
        )
    }
}
