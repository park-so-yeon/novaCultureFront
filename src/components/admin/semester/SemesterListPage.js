import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../admin.css';

function SemesterList({ onEdit }) {
  const navigate = useNavigate();

  const [semesters, setSemesters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.post('/api/semester/semesterList', {}, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        setSemesters(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('학기 목록을 불러오지 못했습니다.');
        setLoading(false);
      });
  }, []);

  const filteredSemesters = semesters.filter(sem =>
    (sem.semesterName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="admin-list-title">학기 목록</h2>
      <div className="admin-list-page">
        <div className="admin-list-toolbar" style={{ justifyContent: 'flex-end' }}>
          <div className="admin-list-search" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="admin-input"
              placeholder="학기명 검색"
              style={{ width: 140 }}
            />
            <button className="admin-list-btn">검색</button>
            <button className="admin-list-btn" onClick={() => navigate('/admin/semester/register')}>
              등록하기
            </button>
          </div>
        </div>

        {loading ? (
          <p>불러오는 중...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>학기명</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredSemesters.map(sem => (
                <tr key={sem.id}>
                  <td>{sem.semesterName}</td>
                  <td>{sem.startDate}</td>
                  <td>{sem.endDate}</td>
                  <td>
                    <button className="admin-list-btn" onClick={() => onEdit?.(sem)}>
                      수정
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSemesters.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>검색 결과가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SemesterList;
