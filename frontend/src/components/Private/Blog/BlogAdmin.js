import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogListItem from "./BlogListItem";

export default function BlogAdmin() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("/api/blog/blogs")
            .then(res => setBlogs(res.data.blogs))
    }, [])

    const handleNewPost = () => {

    }

    return (
        <div className="blog-admin-page">
            <div className="blog-admin-title">
                <div className="blog-admin-title-header">
                    <h1>Posts {blogs.length}</h1>
                </div>
                <div className="blog-admin-title-button">
                    <button type="button" onClick={handleNewPost}>Create New Post</button>
                </div>
            </div>
            <div>
                <table>
                    <tbody>
                        {blogs.map((blog) => (
                            <BlogListItem post={blog} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
