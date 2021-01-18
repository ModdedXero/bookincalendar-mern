import React, { useState } from "react";
import { format } from "date-fns";

import Modal from "../../../../Utility/Modal";
import EventDisplay from "../EventDisplay";

export default function CalendarEvent({ eventData, eventType }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <>
            {eventType && 
            <li onClick={toggleModal} key={eventData._id}>
                <div className="calendar-event"
                    style={{ background: eventType.backgroundColor, color: eventType.color }}>
                    {eventType.eventName} - {
                    format(new Date(Date.parse(eventData.eventStartTime)), "h:mm")
                    }
                </div>

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
