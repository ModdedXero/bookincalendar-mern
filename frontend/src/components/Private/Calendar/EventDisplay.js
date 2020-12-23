import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

import { useAuth } from "../../../contexts/AuthContext";

import "react-quill/dist/quill.snow.css";

export default function EventDisplay({ eventType, date, startTime, endTime }) {
    const [imagePreview, setImagePreview] = useState();
    const { downloadFile } = useAuth();

    const description = new DOMParser().parseFromString(eventType.description, "text/xml");

    useEffect(() => {
        downloadFile(eventType.eventName)
            .then((url) => {
                setImagePreview(url);
            })
            .catch(console.log("No image found!"))
    }, [])

    return (
        <div className="session-form">
            <div className="session-picture">
                <img src={imagePreview} />
            </div>
            <div className="session-info-fancy">
                <div className="div-handle">
                    <h3>{eventType.eventName}</h3>
                </div>
                <div className="div-handle">
                    <h3>{date}</h3>
                    <h3>{`${startTime} - ${endTime}`}</h3>
                </div>
                <div className="text-container">
                    <ReactQuill className="text-area-fancy" value={eventType.description} readOnly={true} theme="bubble" />
                </div>
                <button type="button" className="btn btn-info submit-btn">Book Session</button>
            </div>
        </div>
    )
}
