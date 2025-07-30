<<<<<<< HEAD
import React, { useState } from 'react';
import '../../../admin.css';
=======
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../admin.css';
import CalendarComponent from '../../calendar/CalendarComponent';
>>>>>>> 10f33729567fa58409d2086494635c245a57d041

function SemesterRegister() {
  const navigate = useNavigate();

  const [semesterName, setSemesterName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!semesterName || !startDate || !endDate) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    const payload = {
      semesterName,
      startDate,
      endDate
    };

    axios.post('/api/semester/register', payload, { withCredentials: true })
      .then(res => {
        setSuccessMsg('학기 등록이 완료되었습니다.');
        setTimeout(() => {
          navigate('/admin/semester');
        }, 1000);
      })
      .catch(err => {
        console.error(err);
        setError('등록 중 오류가 발생했습니다.');
      });
  };

  return (
    <>
      <h2 className="admin-list-title">학기 등록</h2>
      <div className="admin-login-container">
        <form className="admin-course-form" style={{ maxWidth: 400 }}>
          <div className="admin-form-group">
            <label>학기명</label>
            <input
              type="text"
              className="admin-input"
              value={semesterName}
              onChange={e => setSemesterName(e.target.value)}
            />
          </div>

            <div className="admin-form-group">
              <label>시작일</label>
              <CalendarComponent selectedDate={startDate} onChange={(date) => setStartDate(date)} />
            </div>

            <div className="admin-form-group">
              <label>종료일</label>
              <CalendarComponent selectedDate={endDate} onChange={(date) => setEndDate(date)} />
            </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
        </form>

      </div>
        {/* ✅ 폼 외부 버튼 */}
        <div style={{ marginTop: 20 }}>
          <button
            type="button"
            className="admin-list-btn"
            onClick={handleSubmit}
          >
            등록
          </button>
          <button
            type="button"
            className="admin-list-btn"
            onClick={() => navigate(-1)}
            style={{ marginLeft: 8 }}
          >
            취소
          </button>
        </div>
    </>
  );
}

export default SemesterRegister;
