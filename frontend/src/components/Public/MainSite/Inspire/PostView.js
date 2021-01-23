import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import { 
    FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, LivejournalIcon 
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

import SiteFooter from "../SiteFooter";
import { ReadParam } from "../../../Utility/RandomUtils";

export default function PostView() {
    const [postData, setPostData] = useState("");
    const postID = useRef(ReadParam(window, "postid"));

    useEffect(() => {
        axios.get(`/api/blog/${postID.current}`)
            .then(res => setPostData(res.data.postDoc))
    }, [postID.current])

    return (
        <div className="home-bg-img-3-fixed">
            <div className="inspire-post-navbar">
                <Link className="stripped-button">All Posts</Link>
                <Link className="stripped-button">Featured</Link>
                <Link className="stripped-button">Featured Artists</Link>
                <Link className="stripped-button">Business</Link>
                <div className="float-right">
                </div>
            </div>
            <div className="inspire-post">
                <h1 className="inspire-post-title">{postData.title}</h1>
                <ReactQuill
                    className="inspire-post-quill"
                    readOnly
                    theme="bubble"
                    value={postData.body}
                />
                <div className="inspire-post-share">
                    <FacebookShareButton 
                        url={window.location.href}
                        quote={postData.title} 
                    >
                        <FacebookIcon size={42} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={window.location.href}
                        title={postData.title}
                    >
                        <TwitterIcon size={42} round />
                    </TwitterShareButton>
                    <CopyToClipboard text={window.location.href}>
                        <button className="stripped-button">
                            <LivejournalIcon size={42} round />
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
            <SiteFooter />
        </div>
    )
}
