import React, { useEffect, useState } from "react";
import axios from "axios";

import BlogListItem from "./BlogListItem";
import SiteFooter from "../SiteFooter";
import PostViewNav from "./PostView/PostViewNav";

export default function BlogArtists() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`/api/blog/blogs/category/${"Featured Artists"}`)
            .then(res => setBlogs(res.data.blogs.reverse()))
    })

    return (
        <div className="home-bg-img-3-fixed">
            <div className="inspire-blog">
                <h1>INSPIRE</h1>
                <PostViewNav />
                <ul className="inspire-blog-list">
                    {blogs.map((blog) => {
                        if (blog.visible) {
                            return <BlogListItem post={blog} />
                        }
                    })}
                </ul>
            </div>
            <SiteFooter />
        </div>
    )
}