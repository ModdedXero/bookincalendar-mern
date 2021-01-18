import React, { useState } from "react";
import axios from "axios";

export default function BlogListItem({ post }) {
    const [isVis, setIsVis] = useState(post.visible);

    const toggleVisible = (vis) => {
        if (vis === true) {
            const updatedPost = post;
            updatedPost.visible = true;

            axios.post(`/api/blog/update/${post._id}`, updatedPost)
                .then(res => console.log(res.data.response))
        } else if (vis === false) {
            const updatedPost = post;
            updatedPost.visible = false;

            axios.post(`/api/blog/update/${post._id}`, updatedPost)
                .then(res => console.log(res.data.response))
        }

        setIsVis(vis);
    }

    return (
        <tr className="blog-admin-table-row">
            <td style={{ width: "72px", textAlign: "center" }}>
                {isVis ?
                <button style={{ color: "green", cursor: "pointer" }} onClick={() => toggleVisible(false)}>Visible</button>
                : 
                <button style={{ color: "red", cursor: "pointer" }} onClick={() => toggleVisible(true)}>Hidden</button>}
            </td>
            <td>
                <img 
                    style={{ padding: "10px 10px 5px 10px", height: "95px", width: "auto" }}
                    src={post.coverImage}
                    alt="cover"
                />
            </td>
            <td style={{ width: "auto" }}>
                {post.title}
            </td>
            <td style={{ width: "100px" }}>
                <button className="stripped-button">Edit</button> | <button className="stripped-button">Delete</button>
            </td>
        </tr>
    )
}
