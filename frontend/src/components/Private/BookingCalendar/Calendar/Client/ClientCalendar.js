import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, subMonths, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, isSameMonth, addMonths, isSameDay } from "date-fns";
import axios from "axios";

import ClientCalendarDay from "./ClientCalendarDay";

import "../../../../../styles/calendar.css";

export default function ClientCalendar() {
    let { calendarID } = useParams();

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(() => {
      axios.get(`/api/calendar/events/${calendarID}`)
        .then(res => setEvents(res.data.events))

      axios.get(`/api/calendar/eventtype/${calendarID}`)
        .then(res => setEventTypes(res.data.eventTypes))
    }, [])

    function renderHeader() {
      const dateFormat = "MMMM yyyy";

      return (
        <div className="calendar-header calendar-grid-row flex-middle">
          <div className="calendar-grid-col calendar-grid-col-start">
            <button type="button" className="calendar-button" onClick={nextMonth}>
              <i className="fas fa-chevron-left" />
            </button>
          </div>
          <div className="calendar-grid-col calendar-grid-col-center">
            <span>
              {format(currentMonth, dateFormat)}
            </span>
          </div>
          <div className="calendar-grid-col calendar-grid-col-end">
            <button type="button" className="calendar-button" onClick={nextMonth}>
              <i className="fas fa-chevron-right" />
            </button>
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
            <ClientCalendarDay
              key={day}
              classInfo={`calendar-grid-col calendar-cell ${!isSameMonth(day, monthStart) ? "disabled" : ""} ${isSameDay(day, new Date()) ? "selected" : ""}`} 
              formattedDate={formattedDate}
              day={day}
              events={events}
              eventTypes={eventTypes}
            />
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

    const nextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
    }

    const prevMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1));
    }

    return (
      <div className="component">
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
      </div>
    );
};