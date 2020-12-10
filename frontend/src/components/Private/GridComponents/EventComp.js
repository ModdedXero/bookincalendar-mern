import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import GridComponent from "../../GridComponent";
import { useAuth } from "../../../contexts/AuthContext";
import Modal from "../../Modal";

export default function EventComp() {
    const [eventTypes, setEventTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const eventTypeRef = useRef();

    const eventName = useRef();
    const eventColor = useRef();
    const eventDescription = useRef();
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
                                    key={type.name}
                                    value={type.name}
                                >{type.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <button type="button" className="btn btn-info" onClick={toggleModal}>Create Session Type</button>
            </div>
            <Modal open={isModalOpen} onClose={toggleModal}>
                <div className="session-form">
                    <div className="session-picture">
                        {!imagePreview ?
                        <input type="file" onChange={fileSelectorChange} />
                        : <img src={imagePreview} />}
                    </div>
                    <div className="session-info">
                        <div>
                            <h3>Session Label</h3>
                            <input
                                type="text"
                                ref={eventName}
                            />
                        </div>
                        <div>
                            <h3>Session Color</h3>
                            <input type="color" />
                        </div>
                    </div>
                </div>
            </Modal>
        </GridComponent>
    )
}
