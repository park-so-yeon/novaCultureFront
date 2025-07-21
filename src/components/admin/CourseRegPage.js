import React, { useState, useEffect } from 'react';
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

function CourseRegPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(emptyCourse);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 강좌 수정 모드: id가 있으면 해당 강좌 정보 불러오기
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/course/${id}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          setCourse({
            title: data.title || '',
            teacher: data.teacher || '',
            category: data.category || '',
            description: data.description || '',
            lectureTime: data.lectureTime || '',
            materials: data.materials || '',
            classroom: data.classroom || '',
            tuition: data.tuition || '',
            materialFee: data.materialFee || '',
            rentalFee: data.rentalFee || '',
          });
          setLoading(false);
        })
        .catch(() => {
          setMessage('강좌 정보를 불러오지 못했습니다.');
          setLoading(false);
        });
    }
  }, [id]);

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
    const formData = new FormData();
    const json = JSON.stringify({
      ...course,
      id: id || undefined,
    });
    formData.append('request', new Blob([json], { type: 'application/json' }));
    if (imageFile) {
      formData.append('file', imageFile);
    }
    const url = id ? `/api/course/updateCourse/${id}` : '/api/course/saveCourseBasic';
    const method = id ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        body: formData,
        credentials: 'include',
      });
      if (res.ok) {
        setMessage('저장되었습니다.');
      } else {
        setMessage('저장에 실패했습니다.');
      }
    } catch (err) {
      setMessage('저장 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div style={{ padding: 32, textAlign: 'center' }}>불러오는 중...</div>;

  return (
    <>
      <h2>{id ? '강좌 수정' : '강좌 등록'}</h2>
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
          <button type="submit" className="admin-login-btn">{id ? '수정' : '저장'}</button>
          {message && <div className="admin-error-msg" style={{ color: '#388e3c' }}>{message}</div>}
        </form>
      </div>
    </>
  );
}

export default CourseRegPage; 