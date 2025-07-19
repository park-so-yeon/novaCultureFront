import React, { useState } from 'react';
import '../../admin.css';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' | 'success'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
	setMessage('');
	setMessageType('');
	try {
	  const res = await fetch('/api/auth/adminLogin', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId: id, password: pw })
	  });
  
	  if (res.ok) {
		const data = await res.json();
		if (data.userId) {
		  localStorage.setItem('userName', data.userName);
		  setMessage('로그인에 성공했습니다.');
		  setMessageType('success');
		  setTimeout(() => navigate('/admin'), 700);
		} else {
		  setMessage('사용자 정보를 찾을 수 없습니다.');
		  setMessageType('error');
		}
	  } else {
		const errorData = await res.json();
		if (errorData.message === '아이디가 존재하지 않습니다.') {
		  setMessage('존재하지 않는 아이디입니다.');
		} else if (errorData.message === '비밀번호가 일치하지 않습니다.') {
		  setMessage('비밀번호가 틀렸습니다.');
		} else {
		  setMessage(errorData.message || '로그인 실패');
		}
		setMessageType('error');
	  }
	} catch (err) {
	  setMessage('로그인 중 오류가 발생했습니다.');
	  setMessageType('error');
	}
  };

  return (
    <div className="admin-login-container">
      <h2>관리자 로그인</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="관리자 아이디"
          value={id}
          onChange={e => setId(e.target.value)}
          className="admin-input"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={e => setPw(e.target.value)}
          className="admin-input"
        />
        <button type="submit" className="admin-login-btn">로그인</button>
        {error && <div className="admin-error-msg">{error}</div>}
      </form>
    </div>
  );
}

export default AdminLoginPage; 