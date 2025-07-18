import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

const ReservationCalendar = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateSelect(newDate);
  };

  return (
    <div className="reservation-calendar">
      <h2>날짜 선택</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        minDate={new Date()}
        locale="ko-KR"
      />
    </div>
  );
};

export default ReservationCalendar; 