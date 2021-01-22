import React from "react";

export default function CreateNavbar({ coverImagePreview, fileSelectorChange }) {
    return (
        <div className="blog-create-navbar">
            <h1>Blog Cover</h1>
            <div className="blog-create-cover">
                <input type="file" className="" onChange={(e) => fileSelectorChange(e)} />
                <img src={coverImagePreview} alt="" />
            </div>
        </div>
    )
}
