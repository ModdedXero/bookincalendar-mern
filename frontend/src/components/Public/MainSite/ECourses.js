import React, { useEffect } from "react";

import ComingSoon from "./ComingSoon";

export default function ECourses({ setPage }) {
    useEffect(() => {
        setPage("ECourses");
    })

    return (
        <ComingSoon />
    )
}