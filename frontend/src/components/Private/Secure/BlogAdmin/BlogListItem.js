import React, { useEffect, useState } from "react";
import axios from "axios";

import Modal from "../../../Utility/Modal";
import { Link } from "react-router-dom";
import { BlogPostStatusColor, BlogPostStatus } from "../../../../global";

export default function BlogListItem({ post }) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        axios.get(`/api/blog/comments/count/${post.commentsID}`)
            .then(res => setCommentCount(res.data.response));
    }, [])

    async function handleDelete() {
        await axios.delete(`/api/blog/delete/${post._id}`)
            .then(res => console.log(res.data.response))

        window.location.reload();
    }

    return (
        <div className="secure-blog-post">
            <img src={post.coverImage} />
            <div className="secure-blog-post-title">
                <h1>{post.title}</h1>
                <div className="secure-blog-post-status">
                    <span style={{ backgroundColor: BlogPostStatusColor[post.status] }}>
                        {BlogPostStatus[post.status]}
                    </span>
                </div>
            </div>
            <div className="secure-blog-post-buttons">
                <Link className="stripped-button" to={`/secure/blog/post/${post._id}`}>
                    <i className="fas fa-edit" />
                </Link>
                <Link className="stripped-button" to={`/secure/admin/blog/comments/${post.commentsID}`}>
                    {commentCount}
                    <i className="fas fa-comments" />
                </Link>
                <button className="stripped-button" onClick={() => setDeleteModal(true)}>
                    <i className="fas fa-trash-alt" />
                </button>
            </div>
            <Modal open={deleteModal} onClose={() => setDeleteModal(false)} small>
                <div>
                    <h1>Are you sure you want to delete this post?</h1>
                    <button className="yellow-button" onClick={handleDelete}>Yes</button>
                    <button className="yellow-button" onClick={() => setDeleteModal(false)}>No</button>
                </div>
            </Modal>
        </div>
    )
}
