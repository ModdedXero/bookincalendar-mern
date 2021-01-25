import React, { useEffect } from "react";

import ComingSoon from "./ComingSoon";
import SiteFooter from "./SiteFooter";

export default function Presets({ setPage }) {
    useEffect(() => {
        setPage("Presets");
    })

    return (
        <>
            <ComingSoon />
            <SiteFooter />
        </>
    )
}