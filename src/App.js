import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
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
