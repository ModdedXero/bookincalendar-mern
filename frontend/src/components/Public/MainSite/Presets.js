import React, { useEffect } from "react";

import ComingSoon from "./ComingSoon";

export default function Presets({ setPage }) {
    useEffect(() => {
        setPage("Presets");
    })

    return (
        <ComingSoon />
    )
}