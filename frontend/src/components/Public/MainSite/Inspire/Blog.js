import React, { useEffect, useState } from "react";
import axios from "axios";

import PostListItem from "./PostListItem";
import SiteFooter from "../SiteFooter";
import PostViewNav from "./PostView/PostViewNav";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios("/api/blog/blogs")
            .then(res => setBlogs(res.data.blogs))
            .catch(err => console.log(err))
    }, [blogs])

    return (
        <div className="home-bg-img-3-fixed">
            <div className="inspire-blog">
                <h1>INSPIRE</h1>
                <PostViewNav />
                <ul className="inspire-blog-list">
                    {blogs.map((blog) => {
                        if (blog.visible) {
                            return <PostListItem post={blog} />
                        }
                    })}
                </ul>
            </div>
            <SiteFooter />
        </div>
    )
}