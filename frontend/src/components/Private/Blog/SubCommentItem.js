import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

export default function SubCommentItem({ subComment, containerID, commentID }) {
    const [rendered, setRendered] = useState(false);
    const bodyRef = useRef();

    useEffect(() => {
        bodyRef.current.style.height = "0px";
        const scrollHeight = bodyRef.current.scrollHeight;
        bodyRef.current.style.height = scrollHeight + "px";
        setRendered(true);
    }, [])

    const handleApprove = () => {
        axios.post(`/api/blog/comment/sub/approve/${containerID}`, { commentID: commentID, subComID: subComment._id })
            .then(res => {
                if (res.data.response === "SUCCESS") {
                    subComment.isApproved = true;
                    setRendered(!rendered);
                }
            })
    }

    const renderBody = () => {
        var ret = []
        const sep = subComment.commentBody.split("\\n");
        ret = sep.join("\n");
        return ret;
    }

    return (
        <div className="inspire-subcomment">
            <p>{subComment.authorName} said:</p>
            <p className="inspire-comment-date">{format(new Date(Date.parse(subComment.createdDate)), "MMMM d, yyyy h:mm aaaa")}</p>
            <textarea 
                ref={bodyRef}
                className="inspire-comment-body" 
                readOnly
            >{renderBody()}</textarea>
            {!subComment.isApproved && <button className="yellow-button" onClick={handleApprove}>
                Approve
            </button>}
        </div>
    )
}
