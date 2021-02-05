import React from "react";
import ReactQuill from "react-quill";

import SocialMedia from "../SocialMedia";
import PostViewComments from "./PostViewComments";

export default function PostViewBody({ postData }) {
    return (
        <div className="inspire-post">
            <h1 className="inspire-post-title">{postData.title}</h1>
            <ReactQuill
                className="inspire-post-quill"
                readOnly
                theme="bubble"
                value={postData.body}
            />
            <SocialMedia post={postData} />
            <PostViewComments commentsID={postData.commentsID} />
        </div>
    )
}
