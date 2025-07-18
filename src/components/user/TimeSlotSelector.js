import React from 'react';
import './styles.css';

const TimeSlotSelector = ({ selectedDate, onTimeSelect, courses }) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const selectedDayOfWeek = daysOfWeek[selectedDate.getDay()];

  // 선택된 요일에 해당하는 강좌들만 필터링
  const availableCourses = courses.filter(course => 
    course.dayOfWeek === selectedDayOfWeek
  );

  // 시간대별로 정렬
  availableCourses.sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="time-slot-selector">
      <h2>수강 가능한 강좌</h2>
      <div className="time-slots">
        {availableCourses.length > 0 ? (
          availableCourses.map((course) => (
            <button
              key={course.id}
              className="time-slot-button course-button"
              onClick={() => onTimeSelect(course)}
            >
              <div className="course-time">{course.startTime} - {course.endTime}</div>
              <div className="course-name">{course.name}</div>
              <div className="course-instructor">강사: {course.instructor}</div>
              <div className="course-capacity">
                남은 수강인원: {course.maxStudents}명
              </div>
            </button>
          ))
        ) : (
          <div className="no-courses">
            선택한 날짜에 수강 가능한 강좌가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelector; 