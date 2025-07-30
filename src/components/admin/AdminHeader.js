import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
  const [adminName] = useState(sessionStorage.getItem('userName') || '');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      sessionStorage.removeItem('userName');
      fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      navigate('/administrator');
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header-inner">
        <div className="admin-logo-wrap">
          <img src="/nova_logo.jpg" alt="logo" className="admin-logo" />
        </div>
        <div className="admin-header-actions">
          {adminName ? (
            <>
              <span className="admin-header-name">{adminName} 님</span>
              <button className="admin-header-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <button className="admin-header-btn" onClick={() => navigate('/administrator')}>
              로그인
            </button>
          )}
          <button
            className="admin-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav className={`admin-sidemenu ${menuOpen ? 'open' : ''}`}>
        <div className="admin-menu-list">
          <a href="/admin/semester" className="admin-menu-item">학기관리</a>
          <a href="/admin/course" className="admin-menu-item">강좌관리</a>
          <a href="/admin/member" className="admin-menu-item">회원관리</a>
        </div>
      </nav>
      <style>{`
        @media (max-width: 700px) {
          .admin-header-inner {
            padding: 0 8px !important;
            height: 48px !important;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .admin-header-btn {
            padding: 6px 10px !important;
            font-size: 13px !important;
          }
          .admin-header-name {
            font-size: 14px !important;
          }
          .admin-hamburger {
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            margin-left: 8px;
            cursor: pointer;
          }
          .admin-hamburger span {
            display: block;
            height: 4px;
            width: 28px;
            background: #bfa16b;
            margin: 5px 0;
            border-radius: 2px;
            transition: 0.3s;
          }
          .admin-sidemenu {
            display: none;
            position: absolute;
            top: 48px;
            left: 0;
            width: 100vw;
            background: #fff;
            border-bottom: 2px solid #bfa16b;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            z-index: 150;
            padding-top: 8px;
          }
          .admin-sidemenu.open {
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
          .admin-menu-list a {
            padding: 12px 0;
            text-align: center;
            font-size: 1.1rem;
            border-bottom: 1px solid #eee;
            color: #3B2C1A;
            background: none;
            text-decoration: none;
          }
        }
      `}</style>
    </header>
  );
}

export default AdminHeader;