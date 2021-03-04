import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { ReadParam } from "../../../../Utility/RandomUtils";
import SiteFooter from "../../SiteFooter";
import PostViewNav from "./PostViewNav";
import PostViewBody from "./PostViewBody";
import PostViewFoot from "./PostViewFoot";

export default function PostView() {
    const [postData, setPostData] = useState("");
    const postID = useRef(ReadParam(""));

    useEffect(() => {
        axios.get(`/api/blog/public/${postID.current}`)
            .then(res => setPostData(res.data.postDoc))
            .catch(err => {})
    }, [postID.current])

    return (
        <div className="home-bg-img-3-fixed">
            <div className="inspire-post-container">
                <PostViewNav />
                <PostViewBody postData={postData} />
                <PostViewFoot />
            </div>
            <SiteFooter />
        </div>
    )
}
