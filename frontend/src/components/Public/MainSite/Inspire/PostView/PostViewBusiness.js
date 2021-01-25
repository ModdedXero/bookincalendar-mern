import React, { useEffect } from "react";
import axios from "axios";

import SiteFooter from "../../SiteFooter";
import PostViewNav from "./PostViewNav";
import PostViewBody from "./PostViewBody";
import PostViewFoot from "./PostViewFoot";

export default function PostViewBusiness() {
    useEffect(() => {
        axios.get("")
    })

    // TODO: Fix Navbar Links
    // TODO: Fix Copied Notification
    return (
        <div className="home-bg-img-3-fixed">
            <PostViewNav />
            <PostViewBody />
            <PostViewFoot posts={} />
            <SiteFooter />
        </div>
    )
}