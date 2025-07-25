import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import '../../admin.css';

export default function AdminLayout() {
  const location = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState(null);

  return (
    <div className="admin-layout">
      <aside className="admin-sidemenu">
        <div className="admin-logo-wrap">
          <img src="/nova_logo.jpg" alt="노바문화센터 로고" className="admin-logo" />
        </div>
        <nav className="admin-menu-list">
          {/* 학기관리 */}
          <div className="admin-menu-item"
            onMouseEnter={() => setHoveredMenu('semesters')}
            onMouseLeave={() => setHoveredMenu(null)}>
            <Link
              to="/admin/semesters"
              className={location.pathname.startsWith('/admin/semesters') ? 'active' : ''}
            >
              학기관리
            </Link>
            {(hoveredMenu === 'semesters' || location.pathname.startsWith('/admin/semesters')) && (
              <div className="admin-submenu">
                <Link
                  to="/admin/semesters"
                  className={location.pathname === '/admin/semesters' ? 'active' : ''}
                >
                  학기목록
                </Link>
                <Link
                  to="/admin/semesters/new"
                  className={location.pathname === '/admin/semesters/new' ? 'active' : ''}
                >
                  학기등록
                </Link>
              </div>
            )}
          </div>

          {/* 강좌관리 */}
          <div className="admin-menu-item"
            onMouseEnter={() => setHoveredMenu('courses')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link
              to="/admin/courses"
              className={location.pathname.startsWith('/admin/courses') ? 'active' : ''}
            >
              강좌관리
            </Link>
            {(hoveredMenu === 'courses' || location.pathname.startsWith('/admin/courses')) && (
              <div className="admin-submenu">
                <Link
                  to="/admin/courses"
                  className={location.pathname === '/admin/courses' ? 'active' : ''}
                >
                  전체 강좌
                </Link>
                <Link
                  to="/admin/courses/new"
                  className={location.pathname === '/admin/courses/new' ? 'active' : ''}
                >
                  강좌 등록
                </Link>
              </div>
            )}
          </div>

          {/* 강사관리 */}
          <div className="admin-menu-item"
            onMouseEnter={() => setHoveredMenu('teachers')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link
              to="/admin/teachers"
              className={location.pathname.startsWith('/admin/teachers') ? 'active' : ''}
            >
              강사관리
            </Link>
            {(hoveredMenu === 'teachers' || location.pathname.startsWith('/admin/teachers')) && (
              <div className="admin-submenu">
                <Link
                  to="/admin/teachers"
                  className={location.pathname === '/admin/teachers' ? 'active' : ''}
                >
                  강사 목록
                </Link>
                <Link
                  to="/admin/teachers/new"
                  className={location.pathname === '/admin/teachers/new' ? 'active' : ''}
                >
                  강사 등록
                </Link>
              </div>
            )}
          </div>

          {/* 회원관리 */}
          <div className="admin-menu-item"
            onMouseEnter={() => setHoveredMenu('users')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link
              to="/admin/users"
              className={location.pathname === '/admin/users' ? 'active' : ''}
            >
              회원관리
            </Link>
          </div>

          {/* 예약관리 */}
          <div className="admin-menu-item"
            onMouseEnter={() => setHoveredMenu('reservations')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link
              to="/admin/reservations"
              className={location.pathname === '/admin/reservations' ? 'active' : ''}
            >
              예약관리
            </Link>
          </div>
        </nav>
      </aside>
      <main className="admin-main-content">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
}
