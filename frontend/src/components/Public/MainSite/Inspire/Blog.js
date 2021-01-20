import React, { useEffect, useState } from "react";
import axios from "axios";

import PostListItem from "./PostListItem";
import Footer from "../Footer";

export default function Blog({ setPage }) {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        setPage("Blog");

        axios.get("/api/blog/blogs")
            .then(res => setBlogs(res.data.blogs))
    })

    return (
        <div className="home-bg-img-3-fixed">
            <div className="inspire-blog">
                <h1>INSPIRE</h1>
                <ul className="inspire-blog-list">
                    {blogs.map((blog) => {
                        if (blog.visible) {
                            return <PostListItem post={blog} />
                        }
                    })}
                </ul>
            </div>
            <Footer />
        </div>
    )
}