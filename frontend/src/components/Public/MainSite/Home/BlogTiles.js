import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BlogTiles() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/blog/blogs/featured")
            .then(res => setPosts(res.data.blogs))
    }, [])

    return (
        <div className="bg-img-paral home-bg-img-3 home-blogtiles">
            <h1>FEATURED BLOG POSTS</h1>
            <div className="home-blogtiles-grid">
                {posts.map((post) => {
                    return (
                        <div className="home-blogtiles-tile">
                            <Link to={`/inspire/post/${post.slug}`}>
                                <div 
                                    className="home-blogtiles-tile-img" 
                                    style={{ backgroundImage: `url(${post.coverImage})` }}
                                />
                            </Link>
                            <div className="home-blogtiles-tile-title">
                                <Link className="stripped-button" to={`/inspire/post/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
