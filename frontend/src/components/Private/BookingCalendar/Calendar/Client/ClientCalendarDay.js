import React from "react";
import { isSameDay } from "date-fns";

import ClientCalendarEvent from "./ClientCalendarEvent";

export default function ClientCalendarDay({ classInfo, formattedDate, day, events = [], eventTypes = [] }) {

    function renderEvents(date) {
        if (events.length === 0) return;

        return events.map((event) => {
            if (!isSameDay(Date.parse(event.eventStartTime), date)) {
                return null;
            }

            var tIndex;
            // eslint-disable-next-line
            eventTypes.map((type, index) => {
                if (event.eventType === type._id) {
                    tIndex = index;
                }
            })

            return (
                <ClientCalendarEvent key={event._id} eventData={event} eventType={eventTypes[tIndex]} />
            )
        })
    }

    return (
        <div className={classInfo} key={day.getDate()}>
            <span className="calendar-number">{formattedDate}</span>
            <ul className="calendar-event-list">
                {renderEvents(day)}
            </ul>
        </div>
    )
}
