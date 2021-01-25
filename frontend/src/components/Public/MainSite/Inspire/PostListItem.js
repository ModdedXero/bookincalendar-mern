import React, { useState } from "react";
import ReactQuill from "react-quill";

export default function PostListItem({ post }) {
    const [isModal, setIsModal] = useState(false);

    const toggleModal = (e) => {
        e.stopPropagation();
        setIsModal(!isModal);
    }

    const openBlog = () => {
        window.location.href = window.location.origin + `/inspire/post/?postid=${post._id}`;
    }

    return (
        <li className="inspire-blog-list-item">
            <div className="inspire-blog-list-item-image">
                <img src={post.coverImage} alt="coverImage" onClick={openBlog}></img>
            </div>
            <div className="inspire-blog-list-item-body" onClick={openBlog}>
                <h1>{post.title}</h1>
                <ReactQuill
                    className="inspire-blog-list-item-quill"
                    readOnly
                    theme="bubble"
                    value={post.body}
                />
                <button className="modal-button" onClick={toggleModal}><i className="fas fa-ellipsis-v"></i></button>
            </div>
        </li>
    )
}