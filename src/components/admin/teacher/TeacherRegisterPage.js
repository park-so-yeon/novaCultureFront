import React, { useState } from 'react';
import '../../../admin.css';

function TeacherRegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', memo: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 실제 등록 API 연동 필요
    setMessage('강사 등록이 완료되었습니다.');
  };

  return (
	<>
    <h2 className="admin-list-title" style={{ textAlign: 'left' }}>강사 등록</h2>
    <div className="admin-login-container" style={{textAlign: 'left' }}>
      <form className="admin-course-form" onSubmit={handleSubmit} style={{ alignItems: 'flex-start' }}>
        <label>이름</label>
        <input name="name" value={form.name} onChange={handleChange} className="admin-input" />
        <label>이메일</label>
        <input name="email" value={form.email} onChange={handleChange} className="admin-input" />
        <label>전화번호</label>
        <input name="phone" value={form.phone} onChange={handleChange} className="admin-input" />
        <label>메모</label>
        <textarea name="memo" value={form.memo} onChange={handleChange} className="admin-input" style={{ minHeight: 60 }} />
        <button type="submit" className="admin-login-btn" style={{ alignSelf: 'flex-start', marginTop: 8 }}>등록</button>
        {message && <div className="admin-error-msg" style={{ color: '#388e3c', marginTop: 8 }}>{message}</div>}
      </form>
    </div>
	</>
  );
}

export default TeacherRegisterPage; 