import React from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Contracts() {
    return (
        <SignatureCanvas penColor="black" canvasProps={{ width: 500, height: 200, className: "component-sm" }} />
    )
}
