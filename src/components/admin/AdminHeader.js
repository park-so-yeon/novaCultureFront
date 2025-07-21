import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
  const [adminName] = useState(sessionStorage.getItem('userName') || '');
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      sessionStorage.removeItem('userName');
      fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      navigate('/administrator');
    }
  };

  return (
    <header className="admin-header" style={{
      width: '100%',
      background: '#fff',
      borderBottom: '2px solid #bfa16b',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99
    }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 64,
          padding: '0 24px',
          boxSizing: 'border-box',
          width: '100%'
        }}
      >
        {adminName ? (
          <>
            <span style={{ color: '#3B2C1A', fontWeight: 'bold', fontSize: 17, whiteSpace: 'nowrap' }}>
              {adminName} 님
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: '#bfa16b',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 18px',
                fontWeight: 'bold',
                fontSize: 15,
                cursor: 'pointer',
                marginLeft: 12,
                whiteSpace: 'nowrap'
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/administrator')}
            style={{
              background: '#bfa16b',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 18px',
              fontWeight: 'bold',
              fontSize: 15,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            로그인
          </button>
        )}
      </div>
      <style>{`
        @media (max-width: 700px) {
          .admin-header > div {
            padding: 0 8px !important;
            height: 48px !important;
          }
          .admin-header button {
            padding: 6px 10px !important;
            font-size: 13px !important;
          }
          .admin-header span {
            font-size: 14px !important;
          }
        }
      `}</style>
    </header>
  );
}

export default AdminHeader; 