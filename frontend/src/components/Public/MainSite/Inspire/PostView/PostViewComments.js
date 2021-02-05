import React, { useEffect, useState } from "react";
import axios from "axios";
import PostComment from "./PostComment";
import CommentPost from "./CommentPost";

export default function PostViewComments({ commentsID }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`/api/blog/comments/${commentsID}`)
            .then(res => setComments(res.data.response.comments))

    }, [commentsID])

    return (
        <div>
            <h1 className="inspire-comments-h1">Comment.</h1>
            <CommentPost commentsID={commentsID} />
            <div className="inspire-post-comments-container">
                {comments.map((comment) => {
                    if (comment.isApproved) {
                        return <PostComment comment={comment} containerID={commentsID} />
                    }
                })}
            </div>
        </div>
    )
}