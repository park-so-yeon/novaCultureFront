import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './CalendarComponent.css'; // 커스텀 CSS

function CalendarComponent({ selectedDate, onChange }) {
  const [startDate, setStartDate] = useState(selectedDate || new Date());

  const handleChange = (date) => {
    setStartDate(date);
    if (onChange) onChange(date);
  };

  return (
    <div className="calendar-wrapper">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        className="custom-datepicker"
        calendarClassName="custom-calendar"
        popperPlacement="bottom-start"
      />
    </div>
  );
}

export default CalendarComponent;
