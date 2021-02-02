import React, { useState } from "react";
import parse from 'html-react-parser';

import Modal from "../../../Utility/Modal";
import SocialMedia from "./SocialMedia";

export default function PostListItem({ post }) {
    const [isModal, setIsModal] = useState(false);

    const toggleModal = (e) => {
        e.stopPropagation();
        console.log("modal");
        setIsModal(!isModal);
    }

    return (
        <li className="inspire-blog-list-item">
            <div className="inspire-blog-list-item-image">
                <a href={window.location.origin + `/inspire/post/${post.slug}`}><img src={post.coverImage} alt="coverImage"></img></a>
            </div>
            <div className="inspire-blog-list-item-body no-overflow">
                    <a className="no-decor" href={window.location.origin + `/inspire/post/${post.slug}`}>
                        <h1>{post.title}</h1>
                    </a>
                    <div>{parse(post.body)}</div>
                <button className="modal-button" onClick={toggleModal}><i className="fas fa-ellipsis-v"></i></button>
            </div>
            <Modal open={isModal} onClose={toggleModal} small>
                <SocialMedia post={post} />
            </Modal>
        </li>
    )
}