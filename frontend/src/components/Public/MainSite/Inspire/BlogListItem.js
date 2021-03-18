import React, { useState } from "react";
import { Link } from "react-router-dom"
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
        <div className="home-blogtiles-tile">
            <Link to={`/inspire/post/${post.slug}`}>
                <div 
                    className="home-blogtiles-tile-img" 
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                />
            </Link>
            <div className="home-blogtiles-tile-title">
                <Link className="stripped-button" to={`/inspire/post/${post.slug}`}>
                    {post.title}
                </Link>
            </div>
        </div>
    )
}