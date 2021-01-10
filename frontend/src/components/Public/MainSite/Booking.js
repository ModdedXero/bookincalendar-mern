import React, { useEffect } from "react";

import ComingSoon from "./ComingSoon";

export default function Booking({ setPage }) {
    useEffect(() => {
        setPage("Booking");
    })

    return (
        <ComingSoon />
    )
}