import React, { useState } from 'react';

const CourseSchedule = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: '',
    instructor: '',
    dayOfWeek: '월',
    startTime: '09:00',
    endTime: '10:00',
    maxStudents: 10,
    description: ''
  });

  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const timeSlots = Array.from({ length: 12 }, (_, i) => 
    `${String(i + 9).padStart(2, '0')}:00`
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourses(prev => [...prev, { ...newCourse, id: Date.now() }]);
    setNewCourse({
      name: '',
      instructor: '',
      dayOfWeek: '월',
      startTime: '09:00',
      endTime: '10:00',
      maxStudents: 10,
      description: ''
    });
  };

  const handleDelete = (courseId) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
  };

  return (
    <div className="course-schedule">
      <h2>수강 메뉴 설정</h2>
      
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label htmlFor="name">강좌명</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newCourse.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructor">강사명</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={newCourse.instructor}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dayOfWeek">요일</label>
          <select
            id="dayOfWeek"
            name="dayOfWeek"
            value={newCourse.dayOfWeek}
            onChange={handleInputChange}
          >
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}요일</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="startTime">시작 시간</label>
          <select
            id="startTime"
            name="startTime"
            value={newCourse.startTime}
            onChange={handleInputChange}
          >
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="endTime">종료 시간</label>
          <select
            id="endTime"
            name="endTime"
            value={newCourse.endTime}
            onChange={handleInputChange}
          >
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="maxStudents">최대 수강인원</label>
          <input
            type="number"
            id="maxStudents"
            name="maxStudents"
            min="1"
            max="50"
            value={newCourse.maxStudents}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">강좌 설명</label>
          <textarea
            id="description"
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="submit-button">강좌 추가</button>
      </form>

      <div className="course-list">
        <h3>등록된 강좌 목록</h3>
        <div className="courses">
          {courses.map(course => (
            <div key={course.id} className="course-item">
              <h4>{course.name}</h4>
              <p>강사: {course.instructor}</p>
              <p>시간: {course.dayOfWeek}요일 {course.startTime} - {course.endTime}</p>
              <p>최대 수강인원: {course.maxStudents}명</p>
              <p>{course.description}</p>
              <button 
                onClick={() => handleDelete(course.id)}
                className="delete-button"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSchedule; 