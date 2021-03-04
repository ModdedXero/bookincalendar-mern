import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PostViewFoot() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/blog/blogs/featured")
            .then(res => setPosts(res.data.blogs))
    }, [])

    return (
        <div className="featured-container">
            <div className="featured-container-title">
                <h1>
                    <Link 
                        className="stripped-button" 
                        to={"/inspire/featured"}
                    >
                        {`Featured Posts`}
                    </Link>
                </h1>
                <div className="">
                    <Link 
                        className="stripped-button" 
                        to={"/inspire"}
                    >
                        See All
                    </Link>
                </div>
            </div>
            <div className="inspire-post-featured">
                {posts.map((post, index) => {
                    if (index >= 3) {
                        return null;
                    }

                    return (
                        <div>
                            <a to={`/inspire/post/${post.slug}`}>
                                <img 
                                    src={post.coverImage} 
                                    alt=""
                                />
                            </a>
                            <h4>
                                <a 
                                    className="stripped-button"
                                    to={`/inspire/post/${post.slug}`}
                                >
                                    {post.title}
                                </a>
                            </h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
