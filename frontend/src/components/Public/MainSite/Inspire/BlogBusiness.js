import React, { useEffect, useState } from "react";
import axios from "axios";

import PostListItem from "./PostListItem";
import SiteFooter from "../SiteFooter";
import PostViewNav from "./PostView/PostViewNav";

export default function BlogBusiness({ setPage }) {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        setPage("Inspire");

        axios.get(`/api/blog/blogs/category/${"Business"}`)
            .then(res => setBlogs(res.data.blogs))
    })

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