import React, { useState } from 'react';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      name: '홍길동',
      phone: '010-1234-5678',
      email: 'hong@example.com',
      courseName: '요가 기초',
      date: '2024-04-25',
      time: '09:00',
      status: '확인대기'
    },
    {
      id: 2,
      name: '김철수',
      phone: '010-9876-5432',
      email: 'kim@example.com',
      courseName: '필라테스',
      date: '2024-04-26',
      time: '14:00',
      status: '확인완료'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (reservationId, newStatus) => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === reservationId
          ? { ...reservation, status: newStatus }
          : reservation
      )
    );
  };

  const handleDelete = (reservationId) => {
    if (window.confirm('정말로 이 예약을 삭제하시겠습니까?')) {
      setReservations(prev =>
        prev.filter(reservation => reservation.id !== reservationId)
      );
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesStatus = filterStatus === '전체' || reservation.status === filterStatus;
    const matchesSearch = 
      reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="reservation-management">
      <h2>예약 관리</h2>
      
      <div className="management-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="이름, 전화번호, 이메일, 강좌명으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-box">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="확인대기">확인대기</option>
            <option value="확인완료">확인완료</option>
            <option value="취소">취소</option>
          </select>
        </div>
      </div>

      <div className="reservations-table">
        <table>
          <thead>
            <tr>
              <th>예약일</th>
              <th>강좌명</th>
              <th>예약자</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>시간</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.date}</td>
                <td>{reservation.courseName}</td>
                <td>{reservation.name}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.email}</td>
                <td>{reservation.time}</td>
                <td>
                  <select
                    value={reservation.status}
                    onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                    className={`status-select ${reservation.status}`}
                  >
                    <option value="확인대기">확인대기</option>
                    <option value="확인완료">확인완료</option>
                    <option value="취소">취소</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    className="delete-button"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationManagement; 