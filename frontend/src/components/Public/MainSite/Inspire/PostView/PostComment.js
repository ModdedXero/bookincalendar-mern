import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import { useRerender, useStickyWindow } from "../../../../Utility/Hooks";
import PostSubComment from "./PostSubComment";
import CommentPost from "./CommentPost";

export default function PostComment({ comment, containerID }) {
    const [showReply, setShowReply] = useState(false);

    const bodyRef = useRef();

    useEffect(() => {
        bodyRef.current.style.height = "0px";
        const scrollHeight = bodyRef.current.scrollHeight;
        bodyRef.current.style.height = scrollHeight + "px";
    }, [])

    useRerender(2);
    useStickyWindow();

    const toggleReply = () => {
        setShowReply(!showReply);
    }

    const renderBody = () => {
        var ret = []
        const sep = comment.commentBody.split("\\n");
        ret = sep.join("\n");
        return ret;
    }

    return (
        <div className="inspire-comment">
            <p><a className="stripped-button" href={`https://${comment.authorWebsite}`}>{comment.authorName}</a> said:</p>
            <p className="inspire-comment-date">{format(new Date(Date.parse(comment.createdDate)), "MMMM d, yyyy h:mm aaaa")}</p>
            <textarea 
                ref={bodyRef}
                className="inspire-comment-body" 
                readOnly
            >{renderBody()}</textarea>
            <button className="yellow-button" onClick={toggleReply}>
                {showReply ? "Cancel" : "Reply"}
            </button>
            {showReply && <CommentPost commentsID={comment._id} containerID={containerID} reply />}
            {comment.subComments.map((sub) => {
                if (sub.isApproved) {
                    return <PostSubComment subComment={sub} />
                }
            })}
        </div>
    )
}
