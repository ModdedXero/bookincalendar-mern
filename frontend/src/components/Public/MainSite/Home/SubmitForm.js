import React, { useRef, useState } from "react";
import axios from "axios";

export default function SubmitForm() {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const businessRef = useRef("");
    const websiteRef = useRef("");
    const galleryRef = useRef("");
    const articleRef = useRef("");
    const aboutRef = useRef("");

    const [submitText, setSubmitText] = useState("Submit");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitText("Submitting...")

        const blogSubmit = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            business: businessRef.current.value,
            website: websiteRef.current.value,
            gallery: galleryRef.current.value,
            article: articleRef.current.value,
            about: aboutRef.current.value
        }

        axios.post("/api/submit/blog", blogSubmit)
            .then(res => {
                if (res.data.response === "SUCCESS") {
                    setIsSubmitted(true);
                }
            })
    }

    return (
        <div className="home-submit">
            {isSubmitted && (
                <div 
                    className="alert alert-success"
                    style={{ width: "450px", margin: "0 auto 20px" }}
                >Blog Submitted!</div>
            )}
            <h1>SUBMIT.</h1>
            <p className="home-submit-line" />
            <p className="home-submit-text">
                We are looking for photographers to write helpful tutorials and articles that are photography related to feature on our blog. Include 5-10 photographs that pertain to your article. Do you love to write? Submit your ideas below. 
            </p>
            <form>
                <div className="home-submit-input">
                    <label>Name *</label>
                    <input ref={nameRef} type="text" required></input>
                </div>
                <div className="home-submit-input">
                    <label>Email *</label>
                    <input ref={emailRef} type="text" required></input>
                </div>
                <div className="home-submit-input">
                    <label>Business</label>
                    <input ref={businessRef} type="text"></input>
                </div>
                <div className="home-submit-input">
                    <label>Website</label>
                    <input ref={websiteRef} type="url"></input>
                </div>
                <div className="home-submit-input">
                    <label>Link to Gallery</label>
                    <input ref={galleryRef} type="url"></input>
                </div>
                <div className="home-submit-input">
                    <label>Link to Tutorial/Article</label>
                    <input ref={articleRef} type="url"></input>
                </div>
                <div className="home-submit-input">
                    <label>Tell Us About the Session or Article</label>
                    <textarea ref={aboutRef}></textarea>
                </div>
                <button onClick={handleSubmit} disabled={submitText !== "Submit"} className="home-submit-btn">{submitText}</button>
            </form>
        </div>
    )
}
