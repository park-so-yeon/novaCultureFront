import React, { useState, useEffect } from 'react';

function SemesterList({ onEdit }) {
  const [semesters, setSemesters] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchSemesters();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, semesters]);

  const fetchSemesters = async () => {
    try {
      const res = await fetch('/api/semesters/semesterList');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setSemesters(data);
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilters = () => {
    let temp = semesters.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      temp = temp.filter(s => s.active === isActive);
    }
    setFilteredSemesters(temp);
  };

  const toggleActive = async (id) => {
    try {
      const res = await fetch(`/api/semesters/${id}/toggle`, { method: 'POST' });
      if (!res.ok) throw new Error('Toggle failed');
      fetchSemesters();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="semester-list-page p-4">
      <h2 className="text-xl mb-4">학기 목록</h2>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="학기명 검색"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 flex-grow"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">전체</option>
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
        </select>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">학기명</th>
            <th className="px-4 py-2">시작일</th>
            <th className="px-4 py-2">종료일</th>
            <th className="px-4 py-2">상태</th>
            <th className="px-4 py-2">활성화</th>
            <th className="px-4 py-2">수정</th>
          </tr>
        </thead>
        <tbody>
          {filteredSemesters.map(s => (
            <tr key={s.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.startDate}</td>
              <td className="border px-4 py-2">{s.endDate}</td>
              <td className="border px-4 py-2">{s.active ? '활성' : '비활성'}</td>
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={s.active}
                  onChange={() => toggleActive(s.id)}
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => onEdit(s)}
                  className="px-2 py-1 border rounded"
                >
                  수정
                </button>
              </td>
            </tr>
          ))}
          {filteredSemesters.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4">
                학기 정보가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SemesterList;
