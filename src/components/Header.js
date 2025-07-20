import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaBloggerB, FaUser } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import '../styles.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [showPwModal, setShowPwModal] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const [hoveredBtn, setHoveredBtn] = useState(null); // 'myinfo' | 'logout' | null

  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
  }, []);

  const handleMenuToggle = () => setMenuOpen((open) => !open);

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('userName');
      window.location.reload();
    }
  };

  const handleMyInfoClick = () => {
    setShowPwModal(true);
    setPwInput('');
    setPwError('');
  };

  const handlePwSubmit = (e) => {
    e.preventDefault();
    if (!pwInput) {
      setPwError('비밀번호를 입력하세요.');
      return;
    }
    // 실제 인증 로직은 추후 구현, 일단 입력만 받으면 통과
    setShowPwModal(false);
    setPwInput('');
    setPwError('');
    navigate('/mypage');
  };

  // 관리자 헤더 분기
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

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
          <a href="https://www.instagram.com/_nova_cultural.center?igsh=MmpxbjI5NWJrZDdp" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" aria-label="Blogger"><FaBloggerB /></a>
          {userName ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
              <button
                onClick={handleMyInfoClick}
                className="header-login-btn"
                style={{ background: 'none', border: 'none', color: '#3B2C1A', fontSize: '1.5rem', cursor: 'pointer', padding: 0, position: 'relative' }}
                aria-label="내정보"
                onMouseEnter={() => setHoveredBtn('myinfo')}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <FaUser />
                {hoveredBtn === 'myinfo' && (
                  <span style={{
                    position: 'absolute',
                    top: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    color: '#3B2C1A',
                    fontSize: 13,
                    padding: '2px 8px',
                    borderRadius: 6,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    whiteSpace: 'nowrap',
                    zIndex: 10
                  }}>내정보</span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="header-login-btn"
                style={{ background: 'none', border: 'none', color: '#3B2C1A', fontSize: '1.5rem', cursor: 'pointer', padding: 0, position: 'relative' }}
                aria-label="로그아웃"
                onMouseEnter={() => setHoveredBtn('logout')}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <FiLogOut />
                {hoveredBtn === 'logout' && (
                  <span style={{
                    position: 'absolute',
                    top: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    color: '#3B2C1A',
                    fontSize: 13,
                    padding: '2px 8px',
                    borderRadius: 6,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    whiteSpace: 'nowrap',
                    zIndex: 10
                  }}>로그아웃</span>
                )}
              </button>
            </span>
          ) : (
            <Link to="/login" className="header-login-btn" aria-label="로그인">
              <FiLogIn size={22} />
            </Link>
          )}
        </div>
      </div>
      {/* 비밀번호 입력 모달 */}
      {showPwModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handlePwSubmit} style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 280, boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
            <h3 style={{ margin: 0, marginBottom: 16, color: '#3B2C1A' }}>비밀번호 확인</h3>
            <input
              type="password"
              value={pwInput}
              onChange={e => setPwInput(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              style={{ width: '100%', padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc', marginBottom: 12 }}
              autoFocus
            />
            {pwError && <div style={{ color: '#d32f2f', marginBottom: 8 }}>{pwError}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" onClick={() => setShowPwModal(false)} style={{ background: '#eee', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>취소</button>
              <button type="submit" style={{ background: '#3B2C1A', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>확인</button>
            </div>
          </form>
        </div>
      )}
      {/* 메뉴 오버레이(모바일) 클릭 시 닫힘 */}
      {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

export default Header; 