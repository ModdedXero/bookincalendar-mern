import React, { useEffect } from "react";

import ComingSoon from "./ComingSoon";
import SiteFooter from "./SiteFooter";

export default function Booking({ setPage }) {
    useEffect(() => {
        setPage("Booking");
    })

    return (
        <>
            <ComingSoon />
            <SiteFooter />
        </>
    )
}