import React, { useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { format } from "date-fns";
import axios from "axios";
import Modal from "../../../Utility/Modal";
import EventDisplay from "./EventDisplay";
import { useAuth } from "../../../../contexts/AuthContext";

export default function CalendarEvent({ eventData, eventType }) {
    const { currentUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    function handleRemoveSession(e) {
        e.stopPropagation();

        axios.delete(`/api/calendar/events/${currentUser.uid}/${eventData._id}`)
            .then((res) => console.log(res.data.response))

        window.location.reload();
    }

    return (
        <>
            {eventType && 
            <li onClick={toggleModal} key={eventData._id}>
                <ContextMenuTrigger id={eventData._id}>
                    <div className="calendar-event"
                        style={{ background: eventType.backgroundColor, color: eventType.color }}>
                        {eventType.eventName} - {
                        format(new Date(Date.parse(eventData.eventStartTime)), "h:mm")
                        }
                    </div>
                </ContextMenuTrigger>

                <ContextMenu hideOnLeave id={eventData._id}>
                    <MenuItem date={{ foo: "bar" }} onClick={handleRemoveSession}>
                        Remove Session
                    </MenuItem>
                </ContextMenu>

                <Modal open={isModalOpen} onClose={toggleModal}>
                    <EventDisplay
                        eventType={eventType}
                        date={format(new Date(Date.parse(eventData.eventStartTime)), "EEE do, MMM yyyy")}
                        startTime={format(new Date(Date.parse(eventData.eventStartTime)), "h:mm a")}
                        endTime={format(new Date(Date.parse(eventData.eventEndTime)), "h:mm a")}
                    />
                </Modal>
            </li>
            }
        </>
    )
}
