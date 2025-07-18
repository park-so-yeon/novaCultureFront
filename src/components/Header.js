import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaBloggerB } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import '../styles.css';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen((open) => !open);
  return (
    <header className="main-header">
      <div className="navbar">
        <Link to="/">
          <img src="/nova_logo.jpg" alt="노바문화센터 로고" className="main-logo" />
        </Link>
        {/* 햄버거 버튼 (모바일에서만 보임) */}
        <button className="hamburger-btn" onClick={handleMenuToggle} aria-label="메뉴 열기" aria-expanded={menuOpen}>
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
        {/* 메뉴: 모바일에서는 menuOpen일 때만 보임, PC에서는 항상 보임 */}
        <ul className={`nav-links${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>노바문화센터</Link></li>
          <li><Link to="/instructors" className={location.pathname.startsWith('/instructors') ? 'active' : ''}>강사소개</Link></li>
          <li><Link to="/programs" className={location.pathname.startsWith('/programs') ? 'active' : ''}>프로그램</Link></li>
          <li><Link to="/reservation" className={location.pathname.startsWith('/reservation') ? 'active' : ''}>예약하기</Link></li>
          <li><Link to="/news" className={location.pathname.startsWith('/news') ? 'active' : ''}>소식</Link></li>
        </ul>
        <div className="header-sns">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://www.instagram.com/_nova_cultural.center?igsh=MmpxbjI5NWJrZDdp" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" aria-label="Blogger"><FaBloggerB /></a>
          <Link to="/login" className="header-login-btn" aria-label="로그인">
            <FiLogIn size={22} />
          </Link>
        </div>
      </div>
      {/* 메뉴 오버레이(모바일) 클릭 시 닫힘 */}
      {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

export default Header; 