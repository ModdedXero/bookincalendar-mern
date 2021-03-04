import React, { useEffect, useRef, useState } from "react";

import { ReadParam } from "../../../Utility/RandomUtils";

export default function SecurePostCreate() {
    const postid = ReadParam();

    useEffect(() => {

    }, [])

    if (postid === "post") {
        return (
            <div>
                New Post
            </div>
        )
    } else {
        return (
            <div>
                Edit Post
            </div>
        )
    }
}
