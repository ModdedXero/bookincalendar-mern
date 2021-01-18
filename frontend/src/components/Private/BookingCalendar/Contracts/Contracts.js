import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Contracts() {
    const sigRef = useRef();
    const [sigLastState, setSigLastState] = useState();

    const handleSignature = () => {
        setSigLastState(sigRef.current.toDataURL());
    }

    const handleReset = () => {
        sigRef.current.clear();
    }

    const handleReload = () => {
        sigRef.current.fromDataURL(sigLastState);
    }

    return (
        <div className="component-sm">
            <SignatureCanvas 
                penColor="black" 
                canvasProps={{ width: 500, height: 200, className: "signature" }} 
                ref={sigRef}
                onEnd={handleSignature}/>
            <button type="button" onClick={handleReset}>Reset</button>
            <button type="button" onClick={handleReload}>Load Last</button>
        </div>
    )
}
