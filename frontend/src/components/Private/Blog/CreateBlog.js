import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import Axios from "axios";

import { MakeID } from "../../Utility/RandomUtils";
import { useAuth } from "../../../contexts/AuthContext";

export default function CreateBlog() {
    const { uploadFile } = useAuth();

    const [quill, setQuill] = useState();
    const [imageCounter, setImageCounter] = useState(0);
    const [coverImage, setCoverImage] = useState();
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    
    const blogID = useRef(MakeID(24));
    const titleRef = useRef("");

    const fileSelectorChange = (e) => {
        setCoverImage(e.target.files[0]);
        setCoverImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    async function handleSubmit(e) {
        const postData = {
            title: titleRef.current.firstChild.data,
            body: quill.state.value,
            blogID: blogID.current,
            visible: false
        }

        const fileRef = {
            file: coverImage,
            fileName: `SiteImages/Blog/${blogID.current}/coverImage`,
            isAdmin: true
        }

        await uploadFile(fileRef);
        Axios.post("/api/blog/create", postData)
            .then(res => console.log(res.data.response))
    }

    const quillModules = {
        toolbar: {
            container: [
                ["bold", "italic", "underline","strike", "blockquote"],
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

            // Insert temporary loading placeholder image (Optional)
            // quillRef.current.insertEmbed(range.index, "image", `${window.location.origin}/images/loaders/placeholder.jpg`);
            // Move cursor to right side of image
            // quillRef.current.setSelection(range.index + 1);

            const res = await saveImageToURL(formData);

            // Insert uploaded image
            quill.getEditor().insertEmbed(range.index + 1, "image", res);
            quill.getEditor().setSelection(range.index + 1);

        }
    }

    async function saveImageToURL(data) {
        // Data returns selected image file
        const fileRef = {
            file: data.values().next().value,
            fileName: `SiteImages/Blog/${blogID.current}/${imageCounter}`,
            isAdmin: true
        }
        
        setImageCounter(imageCounter + 1);
        // Return download URL
        return await uploadFile(fileRef);
    }

    return (
        <div className="blog-create">
            <h1>Blog title</h1>
            <div className="blog-create-title-container">
                <span ref={titleRef} className="blog-create-title" role="textbox" contentEditable="true"/>
            </div>
            
            <h1>Blog Body</h1>
            <ReactQuill
                className="blog-create-content"
                ref={el => setQuill(el)}
                theme="snow" 
                modules={quillModules}
                value={quill === undefined ? "" : quill.state.value}
            />
            <h1>Blog Cover</h1>
            <div className="blog-create-cover">
                <input type="file" className="" onChange={fileSelectorChange} />
                <img src={coverImagePreview} alt="" />
            </div>
            <button className="generic-button blog-create-button" onClick={handleSubmit}>Create Post</button>
        </div>
    )
}
