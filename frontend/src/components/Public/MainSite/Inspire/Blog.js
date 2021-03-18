import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import BlogListItem from "./BlogListItem";
import SiteFooter from "../SiteFooter";
import PostViewNav from "./PostView/PostViewNav";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setBlogs([]);

        switch (location.pathname.split('/').pop())
        {
            case "inspire":
                axios.get("/api/blog/blogs")
                    .then(res => setBlogs(res.data.blogs))
                break;
            case "featured":
                axios.get("/api/blog/blogs/featured")
                    .then(res => setBlogs(res.data.blogs))
                break;
            case "artists":
                axios.get(`/api/blog/blogs/category/${"Featured Artists"}`)
                    .then(res => setBlogs(res.data.blogs))
                break;
            case "business":
                axios.get(`/api/blog/blogs/category/${"Business"}`)
                    .then(res => setBlogs(res.data.blogs))
                break;
            case "tutorials":
                axios.get("/api/blog/blogs/category/Tutorials")
                    .then(res => setBlogs(res.data.blogs))
                break;
            default:
                axios.get("/api/blog/blogs")
                    .then(res => setBlogs(res.data.blogs))
                break;
        }
    }, [location])

    return (
        <div className="home-bg-img-3-fixed">
            <div className="inspire-blog">
                <h1>INSPIRE</h1>
                <PostViewNav />
                <div className="home-blogtiles-grid">
                    {blogs.map((blog) => {
                        if (blog.status == 0) {
                            return <BlogListItem post={blog} />
                        }
                    })}
                </div>
            </div>
            <SiteFooter />
        </div>
    )
}