import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaBloggerB } from 'react-icons/fa';
import '../styles.css';

const slideImages = [
  '/main_1.jpg',
  '/main_2.jpg',
  '/main_3.jpg',
];

function MainPage() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slideImages.length);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 4000); // 4초로 늘려서 더 자연스럽게
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="main-page">
      {/* 메인 배너/슬라이드: 화면 전체 */}
      <section className="banner full-banner">
        <div className="main-carousel full-carousel">
          {slideImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`메인 사진 ${idx + 1}`}
              className={`carousel-img${current === idx ? ' active' : ''}`}
            />
          ))}
          {/* 환영 문구 오버레이 */}
          <div className="banner-overlay-text">
            <h1>노바문화센터에 오신 것을 환영합니다!</h1>
            <p>다양한 문화 프로그램과 함께 성장하는 공간</p>
          </div>
        </div>
      </section>

      {/* 주요 프로그램 미리보기 */}
      <section className="program-preview" id="programs">
        <h2>주요 프로그램</h2>
        <div className="program-list">
          <div className="program-item">
            <h3>요가 클래스</h3>
            <p>몸과 마음의 건강을 위한 요가 수업</p>
          </div>
          <div className="program-item">
            <h3>미술 교실</h3>
            <p>창의력을 키우는 다양한 미술 활동</p>
          </div>
          <div className="program-item">
            <h3>영어 회화</h3>
            <p>실생활에 유용한 영어 회화 수업</p>
          </div>
        </div>
      </section>

      {/* 공지사항/이벤트 */}
      <section className="notice-section">
        <h2>공지사항 & 이벤트</h2>
        <ul className="notice-list">
          <li>5월 신규 프로그램 오픈!</li>
          <li>어린이날 특별 이벤트 안내</li>
        </ul>
      </section>

      {/* 강사 미리보기 */}
      <section className="instructor-preview" id="instructors">
        <h2>대표 강사</h2>
        <div className="instructor-list">
          <div className="instructor-item">
            <h3>김민지 강사</h3>
            <p>요가/필라테스 전문</p>
          </div>
          <div className="instructor-item">
            <h3>이준호 강사</h3>
            <p>미술/창의교육 전문가</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage; 