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

export function useRerender(renderCount = 1) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count < renderCount) {
            setCount(count + 1);
        }
    }, [])
}

export function DirtyRerender() {
    window.location.reload();
}