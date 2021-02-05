import React, { useRef, useState } from "react";
import axios from "axios";

export default function CommentPost({ commentsID, reply, containerID }) {
    const [postButton, setPostButton] = useState("Post Comment");

    const commentBodyRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const websiteRef = useRef();
    const signupRef = useRef();

    const handlePostComment = (e) => {
        e.preventDefault();

        setPostButton("Posting...")

        const newComment = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            website: websiteRef.current.value,
            commentBody: commentBodyRef.current.value.replace(/\n/g, "\\n"),
            commentID: commentsID
        }

        if (!reply) {
            axios.post(`/api/blog/comment/add/${commentsID}`, newComment)
                .then(res => {
                    if (res.data.response === "SUCCESS") {
                        setPostButton("Comment is being reviewed!");
                    }
                })
        } else {
            axios.post(`/api/blog/comment/sub/add/${containerID}`, newComment)
                .then(res => {
                    if (res.data.response === "SUCCESS") {
                        setPostButton("Comment is being reviewed!");
                    }
                })
        }

        if (signupRef.current.checked === "on") {
            const newSignup = {
                email: emailRef.current.value,
                firstName: nameRef.current.value.split(" ")[0],
                lastName: nameRef.current.value.split(" ")[1]
            };
    
            axios.post("/api/login/newsletter", newSignup)
        }
    }

    return (
        <form className="inspire-post-comments" onSubmit={handlePostComment}>
            <label>{reply ? "Reply" : "Comment"}</label>
            <textarea ref={commentBodyRef}></textarea>
            <label>Name *</label>
            <input ref={nameRef} />
            <label>Email *</label>
            <input ref={emailRef} />
            <label>Website</label>
            <input ref={websiteRef} />
            <div className="inspire-post-comments-signup">
                <input ref={signupRef} type="checkbox" />
                <label>Sign up for our newsletter!</label>
            </div>
            <button 
                className="yellow-button" 
                type="submit" 
                disabled={postButton !== "Post Comment"}
            >
                {postButton}
            </button>
        </form>
    )
}
