import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../../contexts/AuthContext";
import { BlogPostStatus } from "../../../../global";

export default function SecureBlogPosts() {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`/api/blog/blogs/${currentUser.uid}`)
            .then(res => setPosts(res.data.response));
    }, [currentUser]);

    const getStatusColor = (status) => {
        switch (status) {
            case "0":
                return "#8fd461";
            case "1":
                return "#d94366";
        }
    };

    return (
        <div className="secure-blog-container">
            <div className="generic-table-contentbar">
                <Link className="stripped-button" to="/secure/blog/post">Create Blog</Link>
            </div>
            {posts.map((post) => {
                return (
                    <div className="secure-blog-post">
                        <img src={post.coverImage} />
                        <div className="secure-blog-post-title">
                            <h1>{post.title}</h1>
                            <div className="secure-blog-post-status">
                                <span style={{ backgroundColor: getStatusColor(post.status) }}>
                                    {BlogPostStatus[post.status]}
                                </span>
                            </div>
                        </div>
                        <div className="secure-blog-post-buttons">
                            <Link className="stripped-button" to={`/secure/blog/post/${post._id}`}>
                                <i className="fas fa-edit" />
                            </Link>
                            <button className="stripped-button">
                                <i className="fas fa-paper-plane" />
                            </button>
                            <button className="stripped-button">
                                <i className="fas fa-trash-alt" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
