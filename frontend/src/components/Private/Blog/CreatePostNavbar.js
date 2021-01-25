import React from "react";

import { BlogPostTypes } from "../../../global";

export default function CreatePostNavbar({ defaults, saveDefaults}) {
    return (
        <div className="blog-create-navbar">
            <h1>Blog Cover</h1>
            <div className="blog-create-cover">
                <input type="file" className="" onChange={(e) => saveDefaults(e, "COVER")} />
                <img src={defaults.coverImagePreview} alt="" />
            </div>
            <div>
                <h1>Settings</h1>

                <h3>Category</h3>
                <select onChange={(e) => saveDefaults(e, "CATEGORY")} value={defaults.category} >
                    {BlogPostTypes.map((type) => {
                        return (
                            <option>{type}</option>
                        )
                    })}
                </select>

                <h3>Published</h3>
                <input type="checkbox" onClick={(e) => saveDefaults("", "PUBLISHED")} checked={defaults.visible} />

                <h3>Featured</h3>
                <input type="checkbox" onClick={(e) => saveDefaults("", "FEATURED")} checked={defaults.featured} />
            </div>
        </div>
    )
}
