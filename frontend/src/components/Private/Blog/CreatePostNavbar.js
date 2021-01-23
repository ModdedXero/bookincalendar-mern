import React from "react";

import { BlogPostTypes } from "../../../global";

export default function CreatePostNavbar({ coverImagePreview, fileSelectorChange, defaultCategory, handleCatgory }) {
    return (
        <div className="blog-create-navbar">
            <h1>Blog Cover</h1>
            <div className="blog-create-cover">
                <input type="file" className="" onChange={(e) => fileSelectorChange(e)} />
                <img src={coverImagePreview} alt="" />
            </div>
            <div>
                <h1>Category</h1>
                <select onChange={(e) => handleCatgory(e)} value={defaultCategory} >
                    {BlogPostTypes.map((type) => {
                        return (
                            <option>{type}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
