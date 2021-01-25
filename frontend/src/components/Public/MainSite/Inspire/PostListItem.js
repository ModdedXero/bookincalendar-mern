import React, { useState } from "react";
import ReactQuill from "react-quill";

export default function PostListItem({ post }) {
    const [isModal, setIsModal] = useState(false);

    const toggleModal = (e) => {
        e.stopPropagation();
        setIsModal(!isModal);
    }

    return (
        <li className="inspire-blog-list-item">
            <div className="inspire-blog-list-item-image">
                <a href={window.location.origin + `/inspire/post/?postid=${post._id}`}><img src={post.coverImage} alt="coverImage"></img></a>
            </div>
            <div className="inspire-blog-list-item-body">
                <a className="no-decor" href={window.location.origin + `/inspire/post/?postid=${post._id}`}>
                    <h1>{post.title}</h1>
                    <ReactQuill
                        className="inspire-blog-list-item-quill"
                        readOnly
                        theme="bubble"
                        value={post.body}
                    />
                </a>
                <button className="modal-button" onClick={toggleModal}><i className="fas fa-ellipsis-v"></i></button>
            </div>
        </li>
    )
}