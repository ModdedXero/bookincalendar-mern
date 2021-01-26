import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

import { GenerateLocalURL, ReadParam } from "../../../../Utility/RandomUtils";
import SiteFooter from "../../SiteFooter";
import PostViewNav from "./PostViewNav";
import PostViewBody from "./PostViewBody";
import PostViewFoot from "./PostViewFoot";

export default function PostView() {
    const [postData, setPostData] = useState("");
    const postID = useRef(ReadParam(window, ""));

    useEffect(() => {
        axios.get(`https://www.boldemotionalcolorful.com/api/blog/public/${postID.current}`)
            .then(res => setPostData(res.data.postDoc))
            .catch(err => {})
    }, [postID.current])

    // TODO: Fix Navbar Links
    // TODO: Fix Copied Notification
    return (
        <div className="home-bg-img-3-fixed">
            <Helmet>
                <title>{postData.seoTitle}</title>
                <meta name="title" content={postData.title} />
                <meta name="description" content={postData.seoDescription} />
                <meta name="image" content={postData.coverImage} />
                <meta name="url" content={`https://www.boldemotionalcolorful.com/inspire/post/${postData.slug}`} />
                <meta property="og:description" content={postData.seoDescription} />
                <meta property="og:type" content="article" />
                <meta 
                    property="og:url" 
                    content={`https://www.boldemotionalcolorful.com/inspire/post/${postData.slug}`} 
                />
                <meta property="og:title" content={postData.title} />
                <meta property="og:image" content={postData.coverImage} />
            </Helmet>
            <PostViewNav />
            <PostViewBody postData={postData} />
            <PostViewFoot category="FEATURED" />
            <SiteFooter />
        </div>
    )
}
