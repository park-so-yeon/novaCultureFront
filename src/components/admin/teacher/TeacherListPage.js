import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../admin.css';

const teachers = [
  { id: 1, name: '김강사', email: 'kim@nova.com', phone: '010-1111-2222', memo: '요가 전문' },
  { id: 2, name: '박강사', email: 'park@nova.com', phone: '010-3333-4444', memo: '미술 지도' },
  { id: 3, name: '이강사', email: 'lee@nova.com', phone: '010-5555-6666', memo: '음악 강사' },
];

function TeacherListPage() {
  const [search, setSearch] = useState('');
  const filtered = teachers.filter(t => t.name.includes(search) || t.email.includes(search) || t.phone.includes(search));

  return (
    <>
      <h2 className="admin-list-title">강사 목록</h2>
      <div className="admin-list-page">
        <div className="admin-list-toolbar" style={{ justifyContent: 'flex-end' }}>
          <div className="admin-list-search" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label>Search: </label>
            <input value={search} onChange={e => setSearch(e.target.value)} className="admin-input" style={{ width: 140 }} />
            <button className="admin-list-btn">검색</button>
            <Link to="/admin/teachers/new" className="admin-list-btn">등록하기</Link>
          </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>No</th>
              <th>이름</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(teacher => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="admin-list-footer">
          <span>Showing {filtered.length} of {teachers.length} entries</span>
          <div className="admin-list-pagination">
            <button className="admin-list-btn" disabled>{'<'}</button>
            <span style={{ margin: '0 8px' }}>1</span>
            <button className="admin-list-btn" disabled>{'>'}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherListPage; 