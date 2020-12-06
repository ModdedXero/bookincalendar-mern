import React, { useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "../../styles/react-contextmenu.css";
import Modal from "../Modal";

export default function CalendarEvent({ eventData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    function handleClickTest(e) {
        e.stopPropagation();
        console.log("Man that worked");
    }

    return (
        <li onClick={toggleModal}>
            <ContextMenuTrigger id="event">
                <div className="calendar-event">{eventData.eventName}</div>
            </ContextMenuTrigger>

            <ContextMenu id="event">
                <MenuItem date={{ foo: "bar" }} onClick={handleClickTest}>
                    Item 1 wow
                </MenuItem>
                <MenuItem divider />
                <MenuItem date={{ foo: "bar" }} onClick={handleClickTest}>
                    Item 2 wow
                </MenuItem>
            </ContextMenu>

            <Modal open={isModalOpen} onClose={toggleModal}>WoW</Modal>
        </li>
    )
}
