import React, { useState } from "react";

import { useStickyWindow } from "./Hooks";

export default function Button({ activeText, disabledText, className, style, buttonClass, onSubmit, children }) {
    const [buttonText, setButtonText] = useState(activeText);

    const handleSubmit = (e) => {
        setButtonText(disabledText);
        if (onSubmit) onSubmit(e);
    }

    useStickyWindow();

    return (
        <form onSubmit={handleSubmit} className={className} style={style}>
            {children}
            <button 
                className={buttonText === activeText ? buttonClass : `${buttonClass}-disabled`} 
                type="submit" 
                disabled={buttonText !== activeText}
            >
                {buttonText}
            </button>
        </form>
    )
}
