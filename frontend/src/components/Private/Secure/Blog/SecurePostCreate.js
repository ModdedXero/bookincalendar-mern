import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import ReactQuill from "react-quill";
import TextareaAutosize from "react-textarea-autosize";

import { useAuth } from "../../../../contexts/AuthContext";
import { ReadParam, MakeID } from "../../../Utility/RandomUtils";
import { BlogPostTypes, BlogPostStatus } from "../../../../global";

export default function SecurePostCreate({ authority }) {
    const { uploadFile, currentUser } = useAuth();
    const postid = ReadParam();
    const history = useHistory();

    const [post, setPost] = useState({});
    const [coverImage, setCoverImage] = useState();
    const [coverImagePreview, setCoverImagePreview] = useState("https://firebasestorage.googleapis.com/v0/b/react-auth-dev-57b4d.appspot.com/o/SiteImages%2FBlog%2Fupload-cover.png?alt=media&token=456491a8-7463-4898-b657-7f932e79ebab");
    const [quill, setQuill] = useState();
    const [isSaving, setIsSaving] = useState(false);

    const blogIDRef = useRef(MakeID(24));
    const coverImageInputRef = useRef();

    useEffect(() => {
        if (postid !== "post") {
            axios.get(`/api/blog/${postid}`)
                .then(res => {
                    setPost(res.data.postDoc);
                    setCoverImagePreview(res.data.postDoc.coverImage);
                })
        }
    }, [])

    async function handleSave() {
        if (isSaving) return;

        setIsSaving(true);

        if (postid === "post") {
            if (authority !== 0) {
                post.status = 1;
            }
            post.blogID = blogIDRef.current;
            post.authorID = currentUser.uid;

            const fileRef = {
                file: coverImage,
                fileName: `SiteImages/Blog/${blogIDRef.current}/coverImage`,
                isAdmin: true
            }

            post.coverImage = await uploadFile(fileRef);

            console.log(post)
            await axios.post("/api/blog/create", post)
                .then(res => console.log(res.data.response))
        } else {
            if (coverImage !== undefined) {
                const fileRef = {
                    file: coverImage,
                    fileName: `SiteImages/Blog/${blogIDRef.current}/coverImage`,
                    isAdmin: true
                }

                post.coverImage = await uploadFile(fileRef);
            }

            await axios.post(`/api/blog/update/${post._id}`, post)
                .then(res => console.log(res.data.response))
        }

        if (authority === 0) {
            history.push("/secure/admin/blog")
        } else {
            history.push("/secure/blog");
        }
    }

    const quillModules = {
        toolbar: {
            container: [
                ["bold", "italic", "underline","strike", "blockquote"],
                [{ "size": ["small", false, "large", "huge"] }],
                [{ "align": []}],
                [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],
                ["link", "image"],
                ["clean"],
            ],
            handlers: {
                image: quillImageHandler,
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

    const handleCoverImageChange = (e) => {
        setCoverImage(e.target.files[0]);
        setCoverImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleCoverImage = (e) => {
        e.stopPropagation();
        coverImageInputRef.current.click();
    }

    // TODO: Add safety filters for SEO before publish

    return (
        <>
            <div className="secure-blog-create-container-1">
                <h1>Blog Cover</h1>
                <div>
                    <input type="file" ref={coverImageInputRef} onChange={handleCoverImageChange} style={{ display: "none" }} />
                    <img src={coverImagePreview} onClick={handleCoverImage} />
                </div>
            </div>
            <div className="secure-blog-create-container-2">
                <TextareaAutosize
                    defaultValue={post.title}
                    className="secure-blog-create-title" 
                    placeholder="Enter Title..." 
                    onChange={val => { post.title = val.target.value }}
                />

                <ReactQuill 
                    className="secure-blog-create-body"
                    ref={el => setQuill(el)}
                    theme="snow"
                    modules={quillModules}
                    value={post.body || ""}
                    onChange={(val) => { post.body = val }}
                />
            </div>
            {authority === 0 && 
                <div className="secure-blog-create-container-1" style={{ textAlign: "left" }}>
                    <h3>Category</h3>
                    <select onChange={(e) => post.blogCategory = e.target.value}>
                    {BlogPostTypes.map((type) => {
                        return (
                            <option selected={post.blogCategory == type}>{type}</option>
                        )
                    })}
                    </select>

                    <h3>Status</h3>
                    <select onChange={(e) => post.status = e.target.value} defaultValue={post.status}>
                    {Object.entries(BlogPostStatus).map((key, value) => {
                        return (
                            <option value={key[0].toString()} selected={post.status == key[0]}>{key[1]}</option>
                        )
                    })}
                    </select>

                    <h3>Featured</h3>
                    <input type="checkbox" onClick={(e) => post.featured = e.target.value} defaultChecked={post.featured} />
                    <br />
                    <h3>SEO Title</h3>
                    <input onChange={(e) => post.seoTitle = e.target.value} defaultValue={post.seoTitle} />

                    <h3>SEO Slug</h3>
                    <input onChange={(e) => post.slug = e.target.value} defaultValue={post.slug} />

                    <h3>SEO Decsription</h3>
                    <textarea 
                        style={{ resize: "none", backgroundColor: "white", outline: "1px solid black" }}
                        onChange={(e) => post.seoDescription = e.target.value}
                        defaultValue={post.seoDescription}
                        maxLength="130"
                    />
                </div>
            }
            <div className="secure-blog-create-container-1">
                <button className="yellow-button" onClick={handleSave}>Save</button>
            </div>
        </>
    )
}
