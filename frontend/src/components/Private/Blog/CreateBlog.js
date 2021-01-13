import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";

export default function CreateBlog() {
    const [blogContent, setBlogContent] = useState("");

    const handleBlogChange = (a, b, c, d) => {
        setBlogContent(a);
    }

    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ]
    }

    return (
        <div className="blog-admin">
            <ReactQuill
                className="blog-admin-content" 
                theme="snow" 
                modules={quillModules}
                value={blogContent}
                onChange={handleBlogChange}
            >
            </ReactQuill>
        </div>
    )
}
