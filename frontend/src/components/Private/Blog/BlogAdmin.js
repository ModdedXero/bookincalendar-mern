import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BlogAdmin() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("/api/blog/blogs")
            .then(res => setBlogs(res.data))
    }, [])

    return (
        <div>
            
        </div>
    )
}
