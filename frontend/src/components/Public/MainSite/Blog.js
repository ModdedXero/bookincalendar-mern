import React, { useEffect } from "react";

import ComingSoon from "./ComingSoon";

export default function Blog({ setPage }) {
    useEffect(() => {
        setPage("Blog");
    })

    return (
        <ComingSoon />
    )
}