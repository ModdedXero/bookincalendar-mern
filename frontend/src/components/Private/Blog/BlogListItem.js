import React from "react";

export default function BlogListItem({ post }) {
    return (
        <tr>
            <td>
                cover
            </td>
            <td>
                {post.title}
            </td>
            <td>
                {post.visible.toString()}
            </td>
        </tr>
    )
}
