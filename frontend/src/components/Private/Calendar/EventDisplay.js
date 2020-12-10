import React from "react";

export default function EventDisplay({ eventType, startTime, endTime }) {
    return (
        <div>
            {eventType.name} and {startTime} and {endTime}
        </div>
    )
}
