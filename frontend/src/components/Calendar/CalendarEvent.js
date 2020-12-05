import React, { useState } from "react";
import Modal from "../Modal";

export default function CalendarEvent({ eventData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <li className="calendar-event" onClick={toggleModal}>
            YoYo
            <Modal open={isModalOpen} onClose={toggleModal}>WoW</Modal>
        </li>
    )
}
