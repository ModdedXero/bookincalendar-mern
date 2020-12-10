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
import { useAuth } from "../../../contexts/AuthContext";
import CalendarEvent from "./CalendarEvent";
import Modal from "../../Modal";
import "../../../styles/form.css"
import "../../../styles/react-contextmenu.css";
import { et } from "date-fns/locale";

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
        if (eventTypeRef.current.value !== null) return;

        const newEvent = {
            eventType: eventTypes.filter(() => et === eventTypeRef.current.value),
            eventStartTime: startDate,
            eventEndTime: endDate
        }

        axios.post(`/api/calendar/events/${currentUser.uid}/add`, newEvent)
            .then((res) => console.log(res.data.response))
    }

    function renderEvents(date) {
        if (events.length <= 0) return;

        return events.map((event) => {
            const eType = eventTypes.map((type) => {
                if (event.eventType === type._id) {
                    return type;
                }

                return null;
            })
            
            return (
                <>
                    {isSameDay(Date.parse(event.eventDate), date) &&
                    <CalendarEvent eventData={event} eventType={eType} />}
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
                                                key={type.name}
                                                value={type.name}
                                            >{type.name}</option>
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
