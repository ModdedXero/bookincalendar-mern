import React, { useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import axios from "axios";
import Modal from "../Modal";
import { useAuth } from "../../contexts/AuthContext";

export default function CalendarEvent({ eventData }) {
    const { currentUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    function handleRemoveSession(e) {
        e.stopPropagation();

        axios.delete(`http://localhost:5000/calendar/events/${currentUser.uid}/${eventData._id}`)
            .then((res) => console.log(res.data))

        window.location.reload();
    }

    return (
        <li onClick={toggleModal} key={eventData._id}>
            <ContextMenuTrigger id={eventData._id}>
                <div className="calendar-event">{eventData.eventName}</div>
            </ContextMenuTrigger>

            <ContextMenu hideOnLeave id={eventData._id}>
                <MenuItem date={{ foo: "bar" }} onClick={handleRemoveSession}>
                    Remove Session
                </MenuItem>
            </ContextMenu>

            <Modal open={isModalOpen} onClose={toggleModal}>
                <div>
                    {eventData.eventName}
                </div>
            </Modal>
        </li>
    )
}
