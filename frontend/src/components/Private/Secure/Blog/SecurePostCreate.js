import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import TextareaAutosize from "react-textarea-autosize";

import { useAuth } from "../../../../contexts/AuthContext";
import { ReadParam, MakeID } from "../../../Utility/RandomUtils";

export default function SecurePostCreate() {
    const { uploadFile } = useAuth();
    const postid = ReadParam();

    const [quill, setQuill] = useState();

    const quillRef = useRef("");
    const blogIDRef = useRef(MakeID(24));

    useEffect(() => {

    }, [])

    const quillModules = {
        toolbar: {
            container: [
                ["bold", "italic", "underline","strike", "blockquote"],
                [{ "size": ["small", false, "large", "huge"] }],
                [{ "align": []}],
                [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],
                ["link", "image"],
                ["clean"]
            ],
            handlers: {
                image: quillImageHandler
            }
        }
    }

    function quillImageHandler() {
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append("image", file);

            // Save current cursor state
            const range = quill.getEditor().getSelection(true);

            const res = await saveImageToURL(formData);

            // Insert uploaded image
            quill.getEditor().insertEmbed(range.index + 1, "image", res);
            quill.getEditor().setSelection(range.index + 2);
        }
    }

    async function saveImageToURL(data) {
        // Data returns selected image file
        const fileRef = {
            file: data.values().next().value,
            fileName: `SiteImages/Blog/${blogIDRef.current}/${MakeID(12)}`,
            isAdmin: true
        }
        
        // Return download URL
        return await uploadFile(fileRef);
    }

    return (
        <>
            <div className="secure-blog-create-container">
                
            </div>
            <div className="secure-blog-create-container">
                <TextareaAutosize
                    className="secure-blog-create-title" 
                    placeholder="Enter Title..." 
                />

                <ReactQuill 
                    className="secure-blog-create-body"
                    ref={el => setQuill(el)}
                    theme="snow"
                    modules={quillModules}
                    value={quillRef.current || ""}
                    onChange={(val) => { quillRef.current = val }}
                />
            </div>
        </>
    )
}
