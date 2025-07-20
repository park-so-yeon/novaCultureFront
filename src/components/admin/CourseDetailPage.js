import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../admin.css';

const emptyCourse = {
  title: '',
  teacher: '',
  category: '',
  description: '',
  lectureTime: '',
  materials: '',
  classroom: '',
  tuition: '',
  materialFee: '',
  rentalFee: '',
};

function CourseDetailPage() {
  const { id } = useParams();
  // id가 있으면 수정, 없으면 등록. 등록 시 빈 값으로 초기화
  const [course, setCourse] = useState(emptyCourse);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('title', course.title);
      formData.append('teacher', course.teacher);
      formData.append('lectureTime', course.lectureTime);
      formData.append('materials', course.materials);
      formData.append('classroom', course.classroom);
      formData.append('tuition', course.tuition);
      formData.append('materialFee', course.materialFee);
      formData.append('rentalFee', course.rentalFee);
      formData.append('description', course.description);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      const res = await fetch('/api/course/saveCourseBasic', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setMessage('강좌 정보가 저장되었습니다.');
      } else {
        setMessage('저장에 실패했습니다.');
      }
    } catch (err) {
      setMessage('저장 중 오류가 발생했습니다.');
    }
  };

  return (
	<>
    <h2>강좌 등록</h2>
    <div className="admin-login-container">
      <form className="admin-course-form" onSubmit={handleSubmit}>
        <label>강좌명</label>
        <input name="title" value={course.title} onChange={handleChange} className="admin-input" />
        <label>강좌소개</label>
        <textarea name="description" value={course.description} onChange={handleChange} className="admin-input" style={{ minHeight: 80 }} />
        <label>강좌 대표 이미지</label>
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: 8 }} />
        {imagePreview && (
          <div style={{ marginBottom: 12 }}>
            <img src={imagePreview} alt="강좌 대표 미리보기" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }} />
          </div>
        )}
        <button type="submit" className="admin-login-btn">저장</button>
        {message && <div className="admin-error-msg" style={{ color: '#388e3c' }}>{message}</div>}
      </form>
    </div>
	</>
  );
}

export default CourseDetailPage; 