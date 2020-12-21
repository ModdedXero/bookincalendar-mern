import React from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Contracts() {
    return (
        <div className="component-sm">
            <SignatureCanvas penColor="black" canvasProps={{ width: 500, height: 200, className: "signature" }} />
        </div>
    )
}
