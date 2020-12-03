import React, { useState } from "react";
import { format, subMonths, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, isSameMonth, addMonths, isSameDay } from "date-fns";
import "../styles/calendar.css";
import Modal from "./Modal";

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

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
              {isSameDay(day, new Date()) && 
              <ul className="calendar-event-list">
                <li className="calendar-event" onClick={() => setIsModalOpen(true)}>YoYo</li>
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>WoW</Modal>
              </ul>}
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