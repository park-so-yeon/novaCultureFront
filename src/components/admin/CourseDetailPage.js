import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../admin.css';

// 예시용 더미 데이터 (실제 구현 시 API로 대체)
const dummyCourse = {
  id: 1,
  title: '요가 입문',
  teacher: '김강사',
  category: '요가',
  description: '초보자를 위한 요가 강좌입니다.'
};

function CourseDetailPage() {
  const { id } = useParams();
  // 실제 구현 시 id로 API 호출해서 데이터 받아오기
  const [course, setCourse] = useState(dummyCourse);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 실제로는 API로 저장
    setMessage('강좌 정보가 저장되었습니다.');
  };

  return (
	<>
    <h2>강좌 수정</h2>
    <div className="admin-login-container">
      <form className="admin-course-form" onSubmit={handleSubmit}>
        <label>강좌명</label>
        <input name="title" value={course.title} onChange={handleChange} className="admin-input" />
        <label>강사</label>
        <input name="teacher" value={course.teacher} onChange={handleChange} className="admin-input" />
        <label>상세정보</label>
        <textarea name="description" value={course.description} onChange={handleChange} className="admin-input" style={{ minHeight: 80 }} />
        <button type="submit" className="admin-login-btn">저장</button>
        {message && <div className="admin-error-msg" style={{ color: '#388e3c' }}>{message}</div>}
      </form>
    </div>
	</>
  );
}

export default CourseDetailPage; 