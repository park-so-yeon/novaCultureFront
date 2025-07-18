import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles.css';

const programs = [
  {
    id: 1,
    image: '/rolyPoly.jpg',
    status: '접수중',
    branch: '울산점',
    title: '성장점 자극 베이비 마사지, 2~8개월',
    semester: '여름학기',
    teacher: '김민서',
    schedule: '세부 일정 선택',
    price: '60,000원',
  },
  {
    id: 2,
    image: 'https://i.ibb.co/6bQyQwB/bebestar-yellow.png',
    status: '접수중',
    branch: '롯데몰광명점',
    title: '7/9 오감톡톡 감성놀이 베베스타 13~21개월',
    semester: '여름학기',
    teacher: '이은혜',
    schedule: '수 10:40~11:20, 총 1회',
    price: '12,000원',
  },
  {
    id: 3,
    image: 'https://i.ibb.co/6bQyQwB/bebestar-yellow.png',
    status: '대기접수',
    branch: '롯데몰광명점',
    title: '7/9 오감톡톡 감성놀이 베베스타 6~11개월',
    semester: '여름학기',
    teacher: '이은혜',
    schedule: '수 12:20~13:00, 총 1회',
    price: '12,000원',
  },
  {
    id: 4,
    image: 'https://i.ibb.co/3r6yQwB/fun-ogam.png',
    status: '대기접수',
    branch: '타임빌라스 수원',
    title: '[7/9] 재미플러스 오감톡! 5~10개월_알록달록 스카프',
    semester: '여름학기',
    teacher: '김윤익',
    schedule: '수 11:20~12:00, 총 1회',
    price: '10,000원',
  },
];

function ReservationPage() {
  return (
    <div className="page-container">
      <h2>강좌 예약</h2>
      <div className="program-list-grid">
        {programs.map((p) => (
          <Link to={`/reservation/${p.id}`} key={p.id} className="program-card-link">
            <div className="program-card">
              <div className="program-img-wrap">
                <img src={p.image} alt={p.title} className="program-img" />
              </div>
              <div className="program-info">
                <div className="program-badges">
                  <span className={`badge status ${p.status === '접수중' ? 'open' : 'wait'}`}>{p.status}</span>
                  <span className="badge branch">{p.branch}</span>
                </div>
                <div className="program-title">{p.title}</div>
                <div className="program-meta">
                  <span>{p.semester} | {p.teacher}</span>
                </div>
                <div className="program-schedule">{p.schedule}</div>
                <div className="program-price">{p.price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ReservationPage; 