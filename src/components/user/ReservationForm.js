import React, { useState } from 'react';
import './styles.css';

const ReservationForm = ({ selectedDate, selectedTime, onSubmit, courses }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    numberOfPeople: 1,
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      courseName: selectedTime.name,
      courseInstructor: selectedTime.instructor
    });
  };

  return (
    <div className="reservation-form">
      <h2>수강 신청</h2>
      
      <div className="selected-course-info">
        <h3>선택한 강좌 정보</h3>
        <p><strong>강좌명:</strong> {selectedTime.name}</p>
        <p><strong>강사:</strong> {selectedTime.instructor}</p>
        <p><strong>시간:</strong> {selectedTime.startTime} - {selectedTime.endTime}</p>
        <p><strong>최대 수강인원:</strong> {selectedTime.maxStudents}명</p>
        <p><strong>강좌 설명:</strong> {selectedTime.description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">전화번호</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPeople">수강 인원</label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            min="1"
            max={selectedTime.maxStudents}
            value={formData.numberOfPeople}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">특별 요청사항</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="필요한 경우 특별 요청사항을 입력해주세요."
          />
        </div>

        <button type="submit" className="submit-button">수강 신청하기</button>
      </form>
    </div>
  );
};

export default ReservationForm; 