import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

import { useStickyWindow } from "../../Utility/Hooks";
import SubCommentItem from "./SubCommentItem";

export default function CommentItem({ comment, containerID }) {
    const [rendered, setRendered] = useState(false);

    const bodyRef = useRef();

    useEffect(() => {
        bodyRef.current.style.height = "0px";
        const scrollHeight = bodyRef.current.scrollHeight;
        bodyRef.current.style.height = scrollHeight + "px";
        setRendered(true);
    }, [])

    const handleApprove = () => {
        axios.post(`/api/blog/comment/approve/${containerID}`, { commentID: comment._id })
            .then(res => {
                if (res.data.response === "SUCCESS") {
                    comment.isApproved = true;
                    setRendered(!rendered);
                }
            })
    }

    useStickyWindow();

    const renderBody = () => {
        var ret = []
        const sep = comment.commentBody.split("\\n");
        ret = sep.join("\n");
        return ret;
    }

    return (
        <div className="inspire-comment">
            <p>{comment.authorName} said:</p>
            <p className="inspire-comment-date">{format(new Date(Date.parse(comment.createdDate)), "MMMM d, yyyy h:mm aaaa")}</p>
            <textarea 
                ref={bodyRef}
                className="inspire-comment-body" 
                readOnly
            >{renderBody()}</textarea>
            {!comment.isApproved && <button className="yellow-button" onClick={handleApprove}>
                Approve
            </button>}
            {comment.subComments.map((sub) => {
                return <SubCommentItem subComment={sub} containerID={containerID} commentID={comment._id} />
            })}
        </div>
    )
}
