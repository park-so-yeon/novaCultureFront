import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../admin.css';

function AdminMainPage() {
  const location = useLocation();
  return (
    <div className="admin-layout">
      <aside className="admin-sidemenu">
        <div className="admin-logo-wrap">
          <img src="/nova_logo.jpg" alt="노바문화센터 로고" className="admin-logo" />
        </div>
        <nav className="admin-menu-list">
          <Link to="/admin/courses" className={location.pathname === '/admin/courses' ? 'active' : ''}>강좌관리</Link>
          <Link to="/admin/users" className={location.pathname === '/admin/users' ? 'active' : ''}>회원관리</Link>
          <Link to="/admin/reservations" className={location.pathname === '/admin/reservations' ? 'active' : ''}>예약관리</Link>
        </nav>
      </aside>
      <main className="admin-main-content">
        <div className="admin-login-container">
          <h2>관리자 메인페이지</h2>
          <p>관리자님, 환영합니다!<br/>여기서 회원, 예약, 프로그램 등 관리가 가능합니다.</p>
        </div>
      </main>
    </div>
  );
}

export default AdminMainPage; 