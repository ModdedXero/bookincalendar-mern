import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import { useRerender } from "../../../../Utility/Hooks";

export default function PostSubComment({ subComment }) {
    const bodyRef = useRef();

    useEffect(() => {
        bodyRef.current.style.height = "0px";
        const scrollHeight = bodyRef.current.scrollHeight;
        bodyRef.current.style.height = scrollHeight + "px";
    }, [])

    useRerender();

    const renderBody = () => {
        var ret = []
        const sep = subComment.commentBody.split("\\n");
        ret = sep.join("\n");
        return ret;
    }

    return (
        <div className="inspire-subcomment">
            <p><a className="stripped-button" href={`https://${subComment.authorWebsite}`}>{subComment.authorName}</a> said:</p>
            <p className="inspire-comment-date">{format(new Date(Date.parse(subComment.createdDate)), "MMMM d, yyyy h:mm aaaa")}</p>
            <textarea 
                ref={bodyRef}
                className="inspire-comment-body" 
                readOnly
            >{renderBody()}</textarea>
        </div>
    )
}
