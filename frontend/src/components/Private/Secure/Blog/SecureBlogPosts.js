import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../../contexts/AuthContext";
import Modal from "../../../Utility/Modal";
import { BlogPostStatus, BlogPostStatusColor } from "../../../../global";

export default function SecureBlogPosts() {
    const { currentUser } = useAuth();
    const [posts, setPosts] = useState([]);
    const [submitModal, setSubmitModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentPost, setCurrentPost] = useState();

    useEffect(() => {
        axios.get(`/api/blog/blogs/${currentUser.uid}`)
            .then(res => setPosts(res.data.response));
    }, [currentUser]);

    async function handleSubmitReview() {
        currentPost.status = 2;
        await axios.post(`/api/blog/update/${currentPost._id}`, currentPost)
            .then(res => console.log(res.data.response))
        window.location.reload();
    }

    async function handleDelete() {
        await axios.delete(`/api/blog/delete/${currentPost._id}`)
            .then(res => console.log(res.data.response))
        window.location.reload();
    }

    const openSubmitModal = (post) => {
        setCurrentPost(post);
        setSubmitModal(true);
    }
    
    const openDeleteModal = (post) => {
        setCurrentPost(post);
        setDeleteModal(true);
    }

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
                                <span style={{ backgroundColor: BlogPostStatusColor[post.status] }}>
                                    {BlogPostStatus[post.status]}
                                </span>
                            </div>
                        </div>
                        <div className="secure-blog-post-buttons" style={{ display: (post.status !== "1" ? "none" : "flex") }}>
                            <Link className="stripped-button" to={`/secure/blog/post/${post._id}`}>
                                <i className="fas fa-edit" />
                            </Link>
                            <button className="stripped-button" onClick={() => openSubmitModal(post)}>
                                <i className="fas fa-paper-plane" />
                            </button>
                            <button className="stripped-button" onClick={() => openDeleteModal(post)}>
                                <i className="fas fa-trash-alt" />
                            </button>
                        </div>
                    </div>
                );
            })}
            <Modal open={submitModal} onClose={() => setSubmitModal(false)} small>
                <div>
                    <h1>Do you want to submit the blog post for review?</h1>
                    <button className="yellow-button" onClick={handleSubmitReview}>Yes</button>
                    <button className="yellow-button" onClick={() => setSubmitModal(false)}>No</button>
                </div>
            </Modal>
            <Modal open={deleteModal} onClose={() => setDeleteModal(false)} small>
                <div>
                    <h1>Do you want to delete the blog post?</h1>
                    <button className="yellow-button" onClick={handleDelete}>Yes</button>
                    <button className="yellow-button" onClick={() => setDeleteModal(false)}>No</button>
                </div>
            </Modal>
        </div>
    );
}
