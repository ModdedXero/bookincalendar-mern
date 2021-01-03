import React, { useRef, useState } from "react";
import { isSameDay } from "date-fns";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';

import { useAuth } from "../../../../contexts/AuthContext";
import CalendarEvent from "./CalendarEvent";
import Modal from "../../../Utility/Modal";

import "../../../../styles/react-contextmenu.css";

export default function CalendarDay({ classInfo, formattedDate, day, events = [], eventTypes = [] }) {
    const { currentUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date(day));
    const [endDate, setEndDate] = useState(new Date(day));
    const eventTypeRef = useRef();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    
    const handleChangeEventType = (e) => {
        eventTypeRef.current.value = e.target.value;
    }

    const handleDateChange = (date) => {
        handleStartTime(date);
        handleEndTime(date);
    }

    const handleStartTime = (date) => {
        setStartDate(date);
    }

    const handleEndTime = (date) => {
        setEndDate(date);
    }

    const handleModalSubmit = (e) => {
        const newEvent = {
            eventType: eventTypes.filter((et) => et.eventName === eventTypeRef.current.value),
            eventStartTime: startDate,
            eventEndTime: endDate
        }

        console.log(newEvent);

        axios.post(`/api/calendar/events/${currentUser.uid}/add`, newEvent)
            .then((res) => console.log(res.data.response))
    }

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
                <CalendarEvent key={event._id} eventData={event} eventType={eventTypes[tIndex]} />
            )
        })
    }

    return (
        <div className={classInfo} key={day.getDate()}>
            <span className="calendar-number">{formattedDate}</span>

            <ContextMenuTrigger id={"" + day.getDate() + day.getMonth()} className="">
                <ul className="calendar-event-list">
                    {renderEvents(day)}
                </ul>
            </ContextMenuTrigger>

            <ContextMenu hideOnLeave id={"" + day.getDate() + day.getMonth()}>
                <MenuItem data={{ foo: "bar" }} onClick={toggleModal}>
                    New Session
                </MenuItem>
            </ContextMenu>

            <Modal open={isModalOpen} onClose={toggleModal} small>
                <div>
                    <h1>New Session</h1>
                    <form onSubmit={handleModalSubmit}>
                        <div>
                            <label>Session Type</label>
                            <br />
                            <select ref={eventTypeRef}
                                required
                                onChange={handleChangeEventType}>
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
                            <div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date"
                                        format="MM/dd/yyyy"
                                        value={startDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <br />
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Start Time"
                                        value={startDate}
                                        onChange={handleStartTime}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                    <br />
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="End Time"
                                        value={endDate}
                                        onChange={handleEndTime}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <button className="btn btn-info" type="submit">Create Session</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
