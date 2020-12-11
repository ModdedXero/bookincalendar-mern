import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";

import GridComponent from "../../GridComponent";
import { useAuth } from "../../../contexts/AuthContext";
import Modal from "../../Modal";

import "react-quill/dist/quill.snow.css";

export default function EventComp() {
    const [eventTypes, setEventTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const eventTypeRef = useRef();

    const eventName = useRef();
    const eventColor = useRef();
    const [eventDescription, setEventDescription] = useState();
    const image = useRef();
    const [imagePreview, setImagePreview] = useState();

    const { currentUser } = useAuth();

    useEffect(() => {
        axios.get(`/api/calendar/eventtype/${currentUser.uid}`)
            .then(res => setEventTypes(res.data.eventTypes))
    }, [])

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const changeEventType = (e) => {
        eventTypeRef.current.value = e.target.value;
    }

    const fileSelectorChange = (e) => {
        image.current = e.target.files[0];
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleDescriptionChange = (val) => {
        setEventDescription(val);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const eventTypeData = {
            eventName: eventName.current.value,
            color: eventColor.current.value,
            description: eventDescription,
            image: image.current.value
        }

        axios.post(`/api/calendar/eventtype/${currentUser.uid}/add`, eventTypeData)
            .then(res => console.log(res.data.response))
    }

    return (
        <GridComponent>
            <div>
                <select ref={eventTypeRef}
                    required
                    onChange={changeEventType}>
                    {
                        eventTypes.map((type) => {
                            return (
                                <option
                                    key={type.eventName}
                                    value={type.eventName}
                                >{type.eventName}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <button type="button" className="btn btn-info" onClick={toggleModal}>Create Session Type</button>
            </div>
            <Modal open={isModalOpen} onClose={toggleModal}>
                <form className="session-form" onSubmit={handleSubmit}>
                    <div className="session-picture">
                        {!imagePreview ?
                        <input type="file" onChange={fileSelectorChange} />
                        : <img src={imagePreview} />}
                    </div>
                    <div className="session-info">
                        <div className="div-handle">
                            <h3>Session Label</h3>
                            <input type="text" ref={eventName} />
                        </div>
                        <div className="div-handle">
                            <h3>Session Color</h3>
                            <input type="color" ref={eventColor} />
                        </div>
                        <div className="text-container">
                            <h3>Session Description</h3>
                            <ReactQuill className="text-area"
                                theme="snow" 
                                value={eventDescription || ""}
                                onChange={handleDescriptionChange} />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-info submit-btn"
                            >Create Session Type</button>
                    </div>
                </form>
            </Modal>
        </GridComponent>
    )
}
