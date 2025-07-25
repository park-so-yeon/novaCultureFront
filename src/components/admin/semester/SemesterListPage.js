import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../admin.css';

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
        console.log(res);
        //setCourses(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError('학기 목록을 불러오지 못했습니다.');
        setLoading(false);
      });
  }, []);

  /*
  const filtered = courses.filter(c =>
    (c.courseName || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.description || '').toLowerCase().includes(search.toLowerCase())
  );
*/
  return (
    <div>
      <h2 className="admin-list-title">강좌 목록</h2>
      <div className="admin-list-page">
          <div className="admin-list-toolbar" style={{ justifyContent: 'flex-end' }}>
            <div className="admin-list-search" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="admin-input"
                style={{ width: 140 }}
              />
              <button className="admin-list-btn">검색</button>
              <button className="admin-list-btn" onClick={() => navigate('/admin/courses/CourseRegPage')}>
                등록하기
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SemesterList;
