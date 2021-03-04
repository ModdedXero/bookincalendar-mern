import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { ReadParam } from "../../../Utility/RandomUtils";
import CommentItem from "./CommentItem";

export default function BlogComments() {
    const commentsID = useRef(ReadParam());

    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`/api/blog/comments/${commentsID.current}`)
            .then(res => setComments(res.data.response.comments))

    }, [commentsID])

    return (
        <div style={{ width: "600px", margin: "auto", backgroundColor: "white", padding: "10px" }}>
            <h1 className="inspire-comments-h1">Comments</h1>
            <div className="inspire-post-comments-container">
                {comments.map((comment) => {
                    return <CommentItem comment={comment} containerID={commentsID.current} />
                })}
            </div>
        </div>
    )
}
