import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useStickyWindow() {
    const windowLocation = useRef({ x: 0, y: 0 });
    
    useLayoutEffect(() => {
        windowLocation.current = { x: window.scrollX, y: window.scrollY };

        if (windowLocation !== null) {
            window.scrollTo(windowLocation.current.x, windowLocation.current.y);
        }
    })
}