import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../admin.css';

function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get('/api/course/courseList')
      .then(res => {
        setCourses(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError('강좌 목록을 불러오지 못했습니다.');
        setLoading(false);
      });
  }, []);

  const filtered = courses.filter(c =>
    c.title?.includes(search) || c.teacher?.includes(search) || c.category?.includes(search)
  );

  return (
    <>
      <h2 className="admin-list-title">강좌 목록</h2>
      <div className="admin-list-page">
        <div className="admin-list-toolbar" style={{ justifyContent: 'flex-end' }}>
          <div className="admin-list-search" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label>Search: </label>
            <input value={search} onChange={e => setSearch(e.target.value)} className="admin-input" style={{ width: 140 }} />
            <button className="admin-list-btn">검색</button>
            <Link to="/admin/courses/new" className="admin-list-btn">등록하기</Link>
          </div>
        </div>
        {loading ? (
          <div style={{ padding: 32, textAlign: 'center' }}>불러오는 중...</div>
        ) : error ? (
          <div style={{ color: '#d32f2f', padding: 32, textAlign: 'center' }}>{error}</div>
        ) : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>강좌명</th>
                  <th>강사</th>
                  <th>카테고리</th>
                  <th>메모</th>
                  <th>작성자</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: '#888', padding: '32px 0' }}>강좌가 없습니다.</td>
                  </tr>
                ) : (
                  filtered.map((course, idx) => (
                    <tr key={course.id || idx}>
                      <td>{course.id || idx + 1}</td>
                      <td><Link to={`/admin/courses/${course.id}`}>{course.title}</Link></td>
                      <td>{course.teacher}</td>
                      <td>{course.category}</td>
                      <td>{course.memo}</td>
                      <td>{course.author}</td>
                      <td>{course.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="admin-list-footer">
              <span>Showing {filtered.length} of {courses.length} entries</span>
              <div className="admin-list-pagination">
                <button className="admin-list-btn" disabled>{'<'}</button>
                <span style={{ margin: '0 8px' }}>1</span>
                <button className="admin-list-btn" disabled>{'>'}</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CourseListPage; 