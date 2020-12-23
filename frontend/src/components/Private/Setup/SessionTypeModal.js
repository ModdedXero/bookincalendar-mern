import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";

import { useAuth } from "../../../contexts/AuthContext";
import Modal from "../../Utility/Modal";

import "react-quill/dist/quill.snow.css";

export default function SessionTypeModal({ isModalOpen, toggleModal, updateType }) {
    const { currentUser, uploadFile, downloadFile } = useAuth();

    const [error, setError] = useState("");

    const [eventName, setEventName] = useState((updateType === undefined) ? "" : updateType.eventName);
    const [eventColor, setEventColor] = useState((updateType === undefined) ? "#000000" : updateType.color);
    const [eventBackgroundColor, setEventBackgroundColor] = useState((updateType === undefined) ? "#000000" : updateType.backgroundColor);
    const [eventDescription, setEventDescription] = useState((updateType === undefined) ? "" : updateType.description);
    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();

    useEffect(() => {
        if (updateType) {
            downloadFile(updateType.eventName)
                .then((url) => {
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = "blob";
                    xhr.onload = (e) => {
                        setImage(xhr.response);
                    }
                    xhr.open("GET", url);
                    xhr.send();

                    setImagePreview(url);
                })
                .catch(console.log("No image found!"))
        }
    }, [])

    const fileSelectorChange = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleDescriptionChange = (val) => {
        setEventDescription(val);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        if (eventName === "") {
            setError("Please enter a label.");
        }

        const fileRef = {
            file: image,
            fileName: eventName,
            upload: null
        }

        const eventTypeData = {
            eventID: (updateType === undefined) ? 0 : updateType._id,
            eventName: eventName,
            color: eventColor,
            backgroundColor: eventBackgroundColor,
            description: eventDescription
        }

        if (eventName !== "") {
            if (updateType) {
                try {
                    await uploadFile(fileRef);
                    axios.post(`/api/calendar/eventtype/${currentUser.uid}/update`, eventTypeData)
                        .then(res => console.log(res.data.response))
                    window.location.reload();
                } catch (err) {
                    console.log(`Failed to upload picture: ${err}`);
                }
            } else {
                try {
                    await uploadFile(fileRef);
                    axios.post(`/api/calendar/eventtype/${currentUser.uid}/add`, eventTypeData)
                        .then(res => console.log(res.data.response))
                    window.location.reload();
                } catch (err) {
                    console.log(`Failed to upload picture: ${err}`);
                }
            }
        }
    }

    return (
        <Modal open={isModalOpen} onClose={toggleModal} error={error}>
            <form className="session-form" onSubmit={handleSubmit}>
                <div className="session-picture">
                    <input type="file" className="x_file-upload" onChange={fileSelectorChange} />
                    {imagePreview && <img src={imagePreview} />}
                </div>
                <div className="session-info">
                    <div className="div-handle">
                        <h3>Label</h3>
                        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    </div>
                    <div className="div-handle">
                        <h3>Text Color</h3>
                        <input type="color" value={eventColor} onChange={(e) => setEventColor(e.target.value)} />
                    </div>
                    <div className="div-handle">
                        <h3>Background Color</h3>
                        <input type="color" value={eventBackgroundColor} onChange={(e) => setEventBackgroundColor(e.target.value)} />
                    </div>
                    <div className="text-container">
                        <h3>Description</h3>
                        <ReactQuill className="text-area"
                            theme="snow" 
                            value={eventDescription || ""}
                            onChange={handleDescriptionChange} />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-info submit-btn"
                        >{updateType ? "Update Session Type" : "Add Session Type"}</button>
                </div>
            </form>
        </Modal>
    )
}
