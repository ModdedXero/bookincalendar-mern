import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BlogTiles() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/blog/blogs/featured")
            .then(res => setPosts(res.data.blogs))
    }, [])

    console.log(posts.length)

    return (
        <div className="bg-img-paral home-bg-img-3 home-blogtiles">
            <h1>FEATURED BLOG POSTS</h1>
            <div className="home-blogtiles-grid">
                {posts.map((post) => {
                    return (
                        <div className="home-blogtiles-tile">
                            <img src={post.coverImage} />
                            <Link className="stripped-button" to={`/inspire/post/${post.slug}`}>
                                {post.title}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
