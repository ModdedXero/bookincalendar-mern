import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";

import { useAuth } from "../../../contexts/AuthContext";
import Modal from "../../Utility/Modal";

import "react-quill/dist/quill.snow.css";

export default function TypeTableItem({ eventType }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { currentUser, uploadFile, downloadFile } = useAuth();
    
    const [eventName, setEventName] = useState(eventType.eventName);
    const [eventColor, setEventColor] = useState(eventType.color);
    const [eventBackgroundColor, setEventBackgroundColor] = useState(eventType.backgroundColor);
    const [eventDescription, setEventDescription] = useState(eventType.description);
    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();

    useEffect(() => {
        downloadFile(eventType.eventName)
            .then((url) => {
                setImagePreview(url);
            })
            .catch(console.log("No image found!"))
    }, [])

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const fileSelectorChange = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleDescriptionChange = (val) => {
        setEventDescription(val);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const fileRef = {
            file: image,
            fileName: eventName,
            upload: null
        }

        const eventTypeData = {
            eventID: eventType._id,
            eventName: eventName,
            color: eventColor,
            backgroundColor: eventBackgroundColor,
            description: eventDescription
        }

        try {
            await uploadFile(fileRef);
            axios.post(`/api/calendar/eventtype/${currentUser.uid}/update`, eventTypeData)
                .then(res => console.log(res.data.response))
            window.location.reload();
        } catch (err) {
            console.log(`Failed to upload picture: ${err}`);
        }
    }

    const handleDelete = () => {
        axios.delete(`/api/calendar/eventtype/${currentUser.uid}/${eventType._id}`)
            .then(res => console.log(res.data.response))

        window.location.reload();
    }

    return (
        <>
            <tr>
                <th scope="row">{eventType.eventName}</th>
                <td className="x_color-block" style={{ backgroundColor: eventType.backgroundColor }}></td>
                <td className="x_color-block" style={{ backgroundColor: eventType.color }}></td>
                <td>Click Edit to View</td>
                <td>Click Edit to View</td>
                <td><button className="btn btn-info submit-btn" onClick={toggleModal}>Edit</button></td>
                <td><button className="btn btn-info submit-btn" onClick={handleDelete}>Delete</button></td>
            </tr>
            <Modal open={isModalOpen} onClose={toggleModal}>
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
                            >Update Session Type</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
