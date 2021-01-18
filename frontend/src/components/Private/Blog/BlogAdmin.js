import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                    <Link className="generic-button" to="/private/admin/blog/create">Create New Post</Link>
                </div>
            </div>
            <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
                <table className="blog-admin-table">
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
