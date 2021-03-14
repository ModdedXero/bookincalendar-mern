import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import BlogListItem from "./BlogListItem";

export default function BlogAdmin() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/blog/blogs")
            .then(res => {
                setPosts(res.data.blogs);
            })
    }, [])

    return (
        <div className="secure-blog-container">
            <div className="generic-table-contentbar">
                <Link className="stripped-button" to="/secure/blog/post">Create Blog</Link>
            </div>
            <div >
                {posts.map((post) => (
                    <BlogListItem post={post} />
                ))}
            </div>
        </div>
    )
}
