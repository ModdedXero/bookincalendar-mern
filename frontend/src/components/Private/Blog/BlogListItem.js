import React, { useEffect, useState } from "react";
import axios from "axios";

import Modal from "../../Utility/Modal";

export default function BlogListItem({ post }) {
    const [isVis, setIsVis] = useState(post.visible);
    const [isModal, setIsModal] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        axios.get(`/api/blog/comments/count/${post.commentsID}`)
            .then(res => setCommentCount(res.data.response));
    }, [])

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

    const toggleDeleteModal = () => {
        setIsModal(!isModal);
    }

    const handleDelete = () => {
        axios.delete(`/api/blog/delete/${post._id}`)
            .then(res => console.log(res.data.response))

        window.location.reload();
    }

    return (
        <tr className="blog-admin-table-row">
            <td style={{ width: "72px", textAlign: "center" }}>
                {isVis ?
                <button style={{ color: "green", cursor: "pointer" }} onClick={() => toggleVisible(false)}>Published</button>
                : 
                <button style={{ color: "red", cursor: "pointer" }} onClick={() => toggleVisible(true)}>Draft</button>}
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
                <a className="stripped-button" href={`/private/admin/blog/edit/?postid=${post._id}`}>Edit</a> | <button className="stripped-button" onClick={toggleDeleteModal}>Delete</button>
            </td>
            <td>
                <a className="stripped-button" href={`/private/admin/blog/comments/?commentsid=${post.commentsID}`}>Comments</a> | <p>{commentCount}</p>
            </td>

            <Modal open={isModal} onClose={toggleDeleteModal} small>
                Are you sure? <button className="generic-button" onClick={handleDelete}>Yes</button> <button className="generic-button" onClick={toggleDeleteModal}>No</button>
            </Modal>
        </tr>
    )
}
