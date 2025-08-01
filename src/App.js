// src/App.js
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
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
import CourseListPage from './components/admin/course/CourseListPage';
import CourseRegPage from './components/admin/course/CourseRegPage';
import TeacherListPage from './components/admin/teacher/TeacherListPage';
import TeacherRegisterPage from './components/admin/teacher/TeacherRegisterPage';
import SemesterListPage from './components/admin/semester/SemesterListPage';
import SemesterRegister from './components/admin/semester/SemesterRegister';

import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import AdminLayout from './components/admin/AdminLayout';

import './components/admin/admin.css';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/"               element={<MainPage />} />
        <Route path="/login"          element={<LoginPage />} />
        <Route path="/signup"         element={<SignupPage />} />
        <Route path="/signup-complete"element={<SignupCompletePage />} />
        <Route path="/administrator"  element={<AdminLoginPage />} />

        {/* Admin Routes: 공통 레이아웃(AdminLayout) + 인증(ProtectedAdminRoute) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          {/* /admin 로 접근하면 AdminMainPage */}
          <Route index               element={<AdminMainPage />} />
          {/* /admin/courses */}
          <Route path="courses"      element={<CourseListPage />} />
          {/* /admin/courses/:id */}
          <Route path="courses/:id"  element={<CourseRegPage />} />
          {/* /admin/teachers */}
          <Route path="teachers"     element={<TeacherListPage />} />
          {/* /admin/teachers/new */}
          <Route path="teachers/new" element={<TeacherRegisterPage />} />
          {/* /admin/semester */}
          <Route path="semester"            element={<SemesterListPage />} />
          <Route path="semester/register"   element={<SemesterRegister />} />
          {/* 필요하면 users, reservations도 추가 */}
          {/* <Route path="users"        element={<UsersPage />} /> */}
          {/* <Route path="reservations" element={<ReservationsPage />} /> */}
        </Route>

        {/* Other Public Pages */}
        <Route path="/programs"      element={<ProgramsPage />} />
        <Route path="/reservation"   element={<ReservationPage />} />
        <Route path="/reservation/:id" element={<ProgramDetailPage />} />
        <Route path="/instructors"   element={<InstructorsPage />} />
        <Route path="/news"          element={<NewsPage />} />

        {/* 404 → Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
