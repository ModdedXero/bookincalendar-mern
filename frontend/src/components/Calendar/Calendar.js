import React, { useState, useEffect } from "react";
import { format, subMonths, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, isSameMonth, addMonths, isSameDay } from "date-fns";
import axios from "axios";
import CalendarEvent from "./CalendarEvent";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/calendar.css";

export default function Calendar() {
    const { currentUser } = useAuth();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [events, setEvents] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/calendar/events/" + currentUser.uid)
      .then(res => setEvents(res.data))
      .catch((err) => { console.log(err) })
    }, [])

    // TODO: Remove this example
    // const newEvent = {
    //   eventName: "Test Yo",
    //   eventDate: new Date()
    // }
    // axios.post(`http://localhost:5000/calendar/events/${currentUser.uid}/add`, newEvent)
    //   .then((res) => console.log(res.data))

    function renderHeader() {
      const dateFormat = "MMMM yyyy";

      return (
        <div className="calendar-header calendar-grid-row flex-middle">
          <div className="calendar-grid-col calendar-grid-col-start">
            <div className="calendar-icon" onClick={prevMonth}>
              chevron_left
            </div>
          </div>
          <div className="calendar-col calendar-col-center">
            <span>
              {format(currentMonth, dateFormat)}
            </span>
          </div>
          <div className="calendar-grid-col calendar-grid-col-end">
            <div className="calendar-icon" onClick={nextMonth}>
              chevron_right
            </div>
          </div>
        </div>
      );
    }

    function renderDays() {
      const dateFormat = "EEEE";
      const days = [];

      let startDate = startOfWeek(currentMonth);

      for (let i = 0; i < 7; i++) {
        days.push(
          <div className="calendar-grid-col calendar-grid-col-center" key={i}>
            {format(addDays(startDate, i), dateFormat)}
          </div>
        );
      }

      return <div className="calendar-days calendar-grid-row">{days}</div>
    }

    function renderCells() {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);

      const dateFormat = "d";
      const rows = [];

      let days = [];
      let day = startDate;
      let formattedDate = "";

      while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          formattedDate = format(day, dateFormat);
          days.push(
            <div className={`calendar-grid-col calendar-cell ${!isSameMonth(day, monthStart) ? "disabled" : ""} ${isSameDay(day, new Date()) ? "selected" : ""}`}
              key={day}
            >
              <span className="calendar-number">{formattedDate}</span>
              <span className="calendar-bg">{formattedDate}</span>
              <ul className="calendar-event-list">
                {renderEvents(day)}
              </ul>
            </div>
          );
          day = addDays(day, 1);
        }
        rows.push(
          <div className="calendar-grid-row" key={day}>
            {days}
          </div>
        );
        days = [];
      }

      return <div className="calendar-body">{rows}</div>
    }

    function renderEvents(date) {
      return events.map((event, index) => {
        return (
          <>
            {isSameDay(Date.parse(event.eventDate), date) &&
            <CalendarEvent key={index} eventData={event} />}
          </>
        )
      })
    }

    const nextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
    }

    const prevMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1));
    }

    return (
      <div className="calendar">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
      </div>
    );
};