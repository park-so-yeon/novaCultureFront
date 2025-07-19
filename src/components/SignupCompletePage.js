import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignupCompletePage() {
    const navigate = useNavigate();
    return (
        <div className="page-container auth-page" style={{ textAlign: 'center', marginTop: '100px' }}>
            {/* 노바문화센터 로고 */}
            <img src="/nova_logo.jpg" alt="노바문화센터 로고" style={{ width: '120px', marginBottom: '32px', borderRadius: '50%' }} />
            <h2>회원가입이 완료되었습니다.</h2>
            <p style={{ margin: '24px 0' }}>노바문화센터의 회원이 되신 것을 환영합니다!</p>
            <button
                className="signup-complete-btn"
                onClick={() => navigate('/login')}
            >
                로그인페이지로 이동
            </button>
        </div>
    );
}

export default SignupCompletePage; 