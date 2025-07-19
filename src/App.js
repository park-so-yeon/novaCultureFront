import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import ProgramsPage from './components/ProgramsPage';
import ReservationPage from './components/reservation/ReservationPage';
import ProgramDetailPage from './components/reservation/ProgramDetailPage';
import InstructorsPage from './components/InstructorsPage';
import NewsPage from './components/NewsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import SignupCompletePage from './components/SignupCompletePage';
import AdminLoginPage from './components/admin/AdminLoginPage';
import AdminMainPage from './components/admin/AdminMainPage';
import { useState } from 'react';
import CourseListPage from './components/admin/CourseListPage';
import CourseDetailPage from './components/admin/CourseDetailPage';
import TeacherListPage from './components/admin/TeacherListPage';
import TeacherRegisterPage from './components/admin/TeacherRegisterPage';

// AdminLayout: 왼쪽 고정 메뉴 + Outlet(본문)
function AdminLayout() {
  const [courseMenuHover, setCourseMenuHover] = useState(false);
  const isCourseActive = window.location.pathname.startsWith('/admin/courses');
  return (
    <div className="admin-layout">
      <aside className="admin-sidemenu">
        <div className="admin-logo-wrap">
          <img src="/nova_logo.jpg" alt="노바문화센터 로고" className="admin-logo" />
        </div>
        <nav className="admin-menu-list">
          <div style={{ width: '100%' }}
            onMouseEnter={() => setCourseMenuHover(true)}
            onMouseLeave={() => setCourseMenuHover(false)}
          >
            <Link
              to="/admin/courses"
              className={isCourseActive ? 'active' : ''}
              style={{ display: 'block', cursor: 'pointer', padding: '10px 0', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', borderRadius: 8, background: (courseMenuHover || isCourseActive) ? '#bfa16b' : undefined, color: (courseMenuHover || isCourseActive) ? '#fff' : '#3B2C1A', transition: 'background 0.18s, color 0.18s' }}
            >
              강좌관리
            </Link>
            {(courseMenuHover || isCourseActive) && (
              <div className="admin-submenu" style={{ display: 'flex', flexDirection: 'column', gap: 0, background: '#f7f7f7', borderRadius: 8, marginTop: 2 }}>
                <Link to="/admin/courses" className={window.location.pathname === '/admin/courses' ? 'active' : ''} style={{ padding: '10px 0', textAlign: 'center', color: '#3B2C1A', borderRadius: 8, textDecoration: 'none', fontWeight: 'normal', fontSize: '1rem' }}>전체 강좌</Link>
                <Link to="/admin/courses/new" className={window.location.pathname === '/admin/courses/new' ? 'active' : ''} style={{ padding: '10px 0', textAlign: 'center', color: '#3B2C1A', borderRadius: 8, textDecoration: 'none', fontWeight: 'normal', fontSize: '1rem' }}>강좌 등록</Link>
                <Link to="/admin/courses/categories" className={window.location.pathname === '/admin/courses/categories' ? 'active' : ''} style={{ padding: '10px 0', textAlign: 'center', color: '#3B2C1A', borderRadius: 8, textDecoration: 'none', fontWeight: 'normal', fontSize: '1rem' }}>강좌 카테고리 관리</Link>
              </div>
            )}
          </div>
          <Link to="/admin/teachers" className={window.location.pathname.startsWith('/admin/teachers') ? 'active' : ''}>강사관리</Link>
          <Link to="/admin/users" className={window.location.pathname === '/admin/users' ? 'active' : ''}>회원관리</Link>
          <Link to="/admin/reservations" className={window.location.pathname === '/admin/reservations' ? 'active' : ''}>예약관리</Link>
        </nav>
      </aside>
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-complete" element={<SignupCompletePage />} />
        <Route path="/administrator" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminMainPage />} />
          <Route path="courses" element={<CourseListPage />} />
          <Route path="courses/:id" element={<CourseDetailPage />} />
          <Route path="teachers" element={<TeacherListPage />} />
          <Route path="teachers/new" element={<TeacherRegisterPage />} />
          {/* 예시: <Route path="courses" element={<AdminCoursesPage />} /> 등 추가 가능 */}
        </Route>
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/reservation/:id" element={<ProgramDetailPage />} />
        <Route path="/instructors" element={<InstructorsPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
