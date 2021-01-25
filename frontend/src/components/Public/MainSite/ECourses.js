import React, { useEffect } from "react";

import ComingSoon from "./ComingSoon";
import SiteFooter from "./SiteFooter";

export default function ECourses({ setPage }) {
    useEffect(() => {
        setPage("ECourses");
    })

    return (
        <>
            <ComingSoon />
            <SiteFooter />
        </>
    )
}