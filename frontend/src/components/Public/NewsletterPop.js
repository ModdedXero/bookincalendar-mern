import React, { useRef, useState } from "react";
import axios from "axios";

import PopNotify from "../Utility/PopNotify";

export default function NewsletterPop() {
    const [complete, setComplete] = useState(false);

    const fNameRef = useRef("");
    const lNameRef = useRef("");
    const emailRef = useRef("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSignup = {
            email: emailRef.current.value,
            firstName: fNameRef.current.value,
            lastName: lNameRef.current.value
        }

        axios.post("/api/login/newsletter", newSignup)
            .then(res => {
                if (res.data.response === "SUCCESS") {
                    setComplete(true);
                } else {
                    // Sign up failed
                }
            })
    }

    return (
        <PopNotify icon="far fa-newspaper" onSubmit={handleSubmit} complete={complete}>
            <div className="newsletter-form">
                <h1>
                    Sign up for our Newsletter!
                </h1>
                <label>First Name</label>
                <input ref={fNameRef} className="generic-input" required />
                <label>Last Name</label>
                <input ref={lNameRef} className="generic-input" required />
                <label>Email</label>
                <input ref={emailRef} className="generic-input" type="email" required />
                <button className="yellow-button" type="submit">Sign Up</button>
            </div>
        </PopNotify>
    )
}
