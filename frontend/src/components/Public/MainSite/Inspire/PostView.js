import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";

import BlogNavbar from "./BlogNavbar";
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
            <BlogNavbar />
            <div className="inspire-post">
                <h1 className="inspire-post-title">{postData.title}</h1>
                <ReactQuill
                    className="inspire-post-quill"
                    readOnly
                    theme="bubble"
                    value={postData.body}
                />
            </div>
            <SiteFooter />
        </div>
    )
}
