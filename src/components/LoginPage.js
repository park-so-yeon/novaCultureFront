import React, { useState } from 'react';
import '../styles.css';

function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  return (
    <div className="auth-page">
      <h2>로그인</h2>
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="userId">아이디</label>
          <input type="text" id="userId" placeholder="아이디" required value={id} onChange={e => setId(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="userPw">비밀번호</label>
          <input type="password" id="userPw" placeholder="비밀번호" required value={pw} onChange={e => setPw(e.target.value)} />
        </div>
        <span className="fm-save">
          <input type="checkbox" id="f-login-chk-2" className="fm-chk" />
          <label htmlFor="f-login-chk-2" className="fm-chk-lb">아이디저장</label>
        </span>
        <button type="submit" disabled={!id}>로그인</button>
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