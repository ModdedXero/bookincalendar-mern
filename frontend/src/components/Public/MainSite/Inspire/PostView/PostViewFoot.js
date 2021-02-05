import React, { useEffect, useState } from "react";
import axios from "axios";

import { GenerateLocalURL } from "../../../../Utility/RandomUtils";

export default function PostViewFoot() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/blog/blogs/featured")
            .then(res => setPosts(res.data.blogs.reverse()))
    }, [posts])

    return (
        <div className="featured-container">
            <div className="featured-container-title">
                <h1>
                    <a 
                        className="stripped-button" 
                        href={GenerateLocalURL("/inspire/featured")}
                    >
                        {`Featured Posts`}
                    </a>
                </h1>
                <div className="">
                    <a 
                        className="stripped-button" 
                        href={GenerateLocalURL("/inspire")}
                    >
                        See All
                    </a>
                </div>
            </div>
            <div className="inspire-post-featured">
                {posts.map((post, index) => {
                    if (index >= 3) {
                        return null;
                    }

                    return (
                        <div>
                            <a href={GenerateLocalURL(`/inspire/post/${post.slug}`)}>
                                <img 
                                    src={post.coverImage} 
                                    alt=""
                                />
                            </a>
                            <h4>
                                <a 
                                    className="stripped-button"
                                    href={GenerateLocalURL(`/inspire/post/${post.slug}`)}
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
