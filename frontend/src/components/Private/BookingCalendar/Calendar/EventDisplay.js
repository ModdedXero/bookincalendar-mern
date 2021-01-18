import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

import { useAuth } from "../../../../contexts/AuthContext";

import "react-quill/dist/quill.snow.css";

export default function EventDisplay({ eventType, date, startTime, endTime }) {
    const [imagePreview, setImagePreview] = useState();
    const { downloadFile } = useAuth();

    useEffect(() => {
        downloadFile(eventType.eventName)
            .then((url) => {
                setImagePreview(url);
            })
            .catch(console.log("No image found!"))
    }, [])

    return (
        <div className="session-form">
            <div className="session-form-content">
                <section className="session-form-image">
                    <img src={imagePreview} alt="Session Photo Cover" />
                </section>
                <section className="session-form-info">
                    <h1>{eventType.eventName}</h1>
                    <div>
                        <h3>{date}</h3>
                        <h3>{`${startTime} - ${endTime}`}</h3>
                    </div>
                    <ReactQuill className="session-form-desc" value={eventType.description} readOnly={true} theme="bubble" />
                    <span className="session-form-total">Total: 300$</span>
                    <button type="button" className="button">Book Session</button>
                </section>
            </div>
        </div>
    )
}
