import React, { useState } from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' | 'success'
  const [capsLockOn, setCapsLockOn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
	e.preventDefault();
	setMessage('');
	setMessageType('');
	try {
	  const res = await fetch('/api/auth/login', {
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
		  setTimeout(() => navigate('/'), 700);
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
    <div className="page-container auth-page">
      <h2>로그인</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">아이디</label>
          <input type="text" id="userId" placeholder="아이디" required value={id} onChange={e => setId(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="userPw">비밀번호</label>
          <input type="password" id="userPw" placeholder="비밀번호" required value={pw} onChange={e => setPw(e.target.value)}
            onKeyUp={e => setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'))}
            onKeyDown={e => setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'))}
          />
          {capsLockOn && (
            <div style={{ color: '#d32f2f', fontSize: '13px', marginTop: 4, fontWeight: 'bold' }}>CapsLock이 켜져 있습니다.</div>
          )}
        </div>
        <span className="fm-save">
          <input type="checkbox" id="f-login-chk-2" className="fm-chk" />
          <label htmlFor="f-login-chk-2" className="fm-chk-lb">아이디저장</label>
        </span>
        <button type="submit" disabled={!id}>로그인</button>
        {message && (
          <div style={{ color: messageType === 'error' ? '#d32f2f' : '#388e3c', marginTop: 16, fontWeight: 'bold' }}>{message}</div>
        )}
        <div className="auth-links-row">
          <a href="/signup" className="auth-link left">회원가입</a>
          <div className="auth-link-group right">
            <a href="#" className="auth-link">아이디 찾기</a>
            <span className="auth-link-divider">|</span>
            <a href="#" className="auth-link">비밀번호 찾기</a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage; 