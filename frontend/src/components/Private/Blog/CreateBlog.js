import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import TextareaAutosize from "react-textarea-autosize";
import Axios from "axios";

import { MakeID, ReadParam } from "../../Utility/RandomUtils";
import { useAuth } from "../../../contexts/AuthContext";
import CreateNavbar from "./CreateNavbar";

export default function CreateBlog() {
    const { uploadFile } = useAuth();
    const postID = useRef(ReadParam(window, "postid"));
    const history = useHistory();

    const [postDoc, setPostDoc] = useState();
    const [quill, setQuill] = useState();
    const [coverImage, setCoverImage] = useState();
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    
    const quillBody = useRef("");
    const blogID = useRef(MakeID(24));
    const titleRef = useRef("");

    useEffect(() => {
        // Get Post data from backend server
        if (postID.current !== null) {
            Axios.get(`/api/blog/${postID.current}`)
                .then(res => {
                    setPostDoc(res.data.postDoc);
                    titleRef.current.value = res.data.postDoc.title;
                    quillBody.current = res.data.postDoc.body;
                    setCoverImagePreview(res.data.postDoc.coverImage);
                    blogID.current = res.data.postDoc.blogID;
                })
        }
    }, [postID.current])

    const fileSelectorChange = (e) => {
        setCoverImage(e.target.files[0]);
        setCoverImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    async function handleSubmit() {
        if (postID.current === undefined) {
            const postData = {
                title: titleRef.current.value,
                body: quillBody.current,
                coverImage: "",
                blogID: blogID.current,
                visible: false
            }

            const fileRef = {
                file: coverImage,
                fileName: `SiteImages/Blog/${blogID.current}/coverImage`,
                isAdmin: true
            }

            postData.coverImage = await uploadFile(fileRef);
            Axios.post("/api/blog/create", postData)
                .then(res => console.log(res.data.response))
            history.push("/private/admin/blog");
        } else {
            const postData = {
                title: titleRef.current.value,
                body: quillBody.current,
                coverImage: postDoc.coverImage,
                blogID: postDoc.blogID,
                visible: postDoc.visible
            };

            const fileRef = {
                file: coverImage,
                fileName: `SiteImages/Blog/${blogID.current}/coverImage`,
                isAdmin: true
            }

            if (coverImage !== undefined) {
                postData.coverImage = await uploadFile(fileRef);
            }

            Axios.post(`/api/blog/update/${postID.current}`, postData)
                .then(res => console.log(res.data.response))
            history.push("/private/admin/blog");
        }
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
            quill.getEditor().setSelection(range.index + 2);

        }
    }

    async function saveImageToURL(data) {
        // Data returns selected image file
        const fileRef = {
            file: data.values().next().value,
            fileName: `SiteImages/Blog/${blogID.current}/${MakeID(12)}`,
            isAdmin: true
        }
        
        // Return download URL
        return await uploadFile(fileRef);
    }

    const handleChange = (val) => {
        quillBody.current = val;
    }

    return (
        <div className="blog-create">
            <CreateNavbar 
                coverImagePreview={coverImagePreview} 
                fileSelectorChange={fileSelectorChange} 
            />
            <div className="blog-create-container">
                <TextareaAutosize 
                    ref={titleRef} 
                    className="blog-create-title" 
                    placeholder="Add a Title" 
                />
                
                <ReactQuill
                    className="blog-create-content"
                    ref={el => setQuill(el)}
                    theme="snow" 
                    modules={quillModules}
                    value={quillBody.current || ""}
                    onChange={handleChange}
                />
                <button className="generic-button blog-create-button" onClick={handleSubmit}>
                    {postDoc !== undefined ? "Update Post" : "Create Post"}
                </button>
            </div>
        </div>
    )
}
