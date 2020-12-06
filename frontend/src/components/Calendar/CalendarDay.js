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
import { useAuth } from "../../contexts/AuthContext";
import CalendarEvent from "./CalendarEvent";
import Modal from "../Modal";
import "../../styles/form.css"
import "../../styles/react-contextmenu.css";

export default function CalendarDay({ classInfo, formattedDate, day, events }) {
    const { currentUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(day));
    const eventName = useRef("");

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleModalSubmit = (e) => {
        if (eventName.current.value.length <= 0) return;

        const newEvent = {
            eventName: eventName.current.value,
            eventDate: selectedDate
        }
        axios.post(`http://localhost:5000/calendar/events/${currentUser.uid}/add`, newEvent)
        .then((res) => console.log(res.data))
    }

    function renderEvents(date) {
        if (events.length <= 0) return;
        console.log(events);

        return events.map((event) => {
            return (
                <>
                    {isSameDay(Date.parse(event.eventDate), date) &&
                    <CalendarEvent eventData={event} />}
                </>
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

            <Modal open={isModalOpen} onClose={toggleModal}>
                <div>
                    <h1 >New Session</h1>
                    <form className="modal-form" onSubmit={handleModalSubmit}>
                        <label>Session Name</label>
                        <br />
                        <input type="text" ref={eventName} />
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <br />
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Time"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <button className="btn btn-info" type="submit">Create Session</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
