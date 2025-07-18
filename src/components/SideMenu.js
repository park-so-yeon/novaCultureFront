import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideMenu = ({ isAdmin }) => {
  const location = useLocation();

  if (isAdmin) {
    return (
      <div className="side-menu">
        <div className="menu-header">
          <h2>관리자 메뉴</h2>
        </div>
        <nav className="menu-items">
          <Link 
            to="/admin/courses" 
            className={`menu-item ${location.pathname === '/admin/courses' ? 'active' : ''}`}
          >
            수강 메뉴 설정
          </Link>
          <Link 
            to="/admin/reservations" 
            className={`menu-item ${location.pathname === '/admin/reservations' ? 'active' : ''}`}
          >
            예약 관리
          </Link>
        </nav>
      </div>
    );
  }

  return (
    <div className="side-menu">
      <div className="menu-header">
        <h2>메뉴</h2>
      </div>
      <nav className="menu-items">
        <Link 
          to="/" 
          className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          홈
        </Link>
        <Link 
          to="/courses" 
          className={`menu-item ${location.pathname === '/courses' ? 'active' : ''}`}
        >
          강좌 목록
        </Link>
        <Link 
          to="/reservation" 
          className={`menu-item ${location.pathname === '/reservation' ? 'active' : ''}`}
        >
          수강 신청
        </Link>
        <Link 
          to="/my-reservations" 
          className={`menu-item ${location.pathname === '/my-reservations' ? 'active' : ''}`}
        >
          내 예약
        </Link>
      </nav>
    </div>
  );
};

export default SideMenu; 