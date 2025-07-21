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
      // 로그인 요청
      const res = await fetch('/api/auth/adminLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: id, password: pw }),
        credentials: 'include' // 서버에서 Set-Cookie로 세션ID를 내려줄 경우 필요
      });

      if (res.ok) {
        // 1. 서버에서 세션 생성 및 수명 설정
        // 2. 서버가 Set-Cookie로 session id를 내려주면 브라우저가 자동 저장 (credentials: 'include' 사용 시)
        // 3. 서버가 session id를 response body로 내려줄 경우 아래처럼 저장
        let sessionId = null;
        try {
          const data = await res.json();
          if (data.sessionId) {
            sessionId = data.sessionId;
            sessionStorage.setItem('sessionId', sessionId); // 명시적으로 저장
          }
          if (data.userName) {
            sessionStorage.setItem('userName', data.userName);
          }
          if (data.userId) {
            setMessage('로그인에 성공했습니다.');
            setMessageType('success');
            setTimeout(() => navigate('/admin'), 700);
          } else {
            setMessage('사용자 정보를 찾을 수 없습니다.');
            setMessageType('error');
          }
        } catch (err) {
          setMessage('로그인 응답 처리 중 오류가 발생했습니다.');
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
    <div style={{ minHeight: '100vh', background: '#f7f7f7', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 56, marginBottom: 32 }}>
        <img src="/nova_logo.jpg" alt="노바문화센터 로고" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, boxShadow: '0 2px 8px rgba(191,161,107,0.08)' }} />
        <div style={{ fontWeight: 'bold', fontSize: 22, color: '#3B2C1A', marginBottom: 4, letterSpacing: 1 }}>노바문화센터 관리자페이지</div>
      </div>
      <div className="admin-login-container" style={{ maxWidth: 500, width: '100%', margin: '0 auto', alignSelf: 'center' }}>
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
          {message && (
            <div style={{ color: messageType === 'error' ? '#d32f2f' : '#388e3c', marginTop: 16, fontWeight: 'bold' }}>{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage; 