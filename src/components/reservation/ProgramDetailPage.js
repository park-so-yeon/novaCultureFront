import React, { useState } from 'react';
import '../../styles.css';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShareAlt } from 'react-icons/fa';

const programs = [
  {
    id: 1,
    image: '/rolyPoly.jpg',
    status: '접수중',
    branch: '울산점',
    title: '성장점 자극 베이비 마사지,2~8개월',
    teacher: '김민서 베이비 마사지 전문 강사',
    type: '단기',
    badge: '지점문의',
    description: `성장발달과 아이와 보호자간의 애착형성에 도움되는 베이비 마사지 수업입니다.\n아이의 성장에 도움되는 최고의 스킨십으로 원할한 신진대사로 성장 발육에 도움됩니다.\n숙면, 소화, 면역에 도움되는 마사지로 진행됩니다.`,
    준비물: '베이비 마사지 오일 or 베이비 로션, 폭신한 큰 타올, 물티슈',
    유의사항: '보호자와 2인1조로 진행, 보호자 1인만 참여 가능',
    info: {
      기간: '2025.06.05 ~ 2025.07.10',
      시간: '목 14:00~14:40',
      횟수: '6회',
      정원: '13명',
      강의실: 'LAB4',
      연령: '2~8개월',
      접수기간: '2025.04.24~2025.06.04',
      문의처: '052-960-3933/4',
      수강료: '60,000원',
    },
  },
  {
    id: 2,
    image: '/main_1.jpg',
    status: '대기접수',
    branch: '울산점',
    title: '오감발달 놀이, 6~12개월',
    teacher: '이은혜 감성놀이 전문가',
    type: '정규',
    badge: '지점문의',
    description: '오감발달 놀이 상세 설명입니다.',
    준비물: '장난감, 간식',
    유의사항: '보호자 동반 필수',
    info: {
      기간: '2025.07.15 ~ 2025.08.19',
      시간: '화 10:00~10:40',
      횟수: '6회',
      정원: '10명',
      강의실: 'LAB2',
      연령: '6~12개월',
      접수기간: '2025.05.01~2025.07.10',
      문의처: '052-960-3933/4',
      수강료: '55,000원',
    },
  },
];

function ProgramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('');
  const selectedProgram = programs.find(p => String(p.id) === selectedId);
  const mainProgram = programs[0]; // 초기화면용(첫번째 강좌)

  return (
    <div class="page-container">
      <button onClick={() => navigate(-1)} className="back-btn">← 목록으로</button>
      <div className="program-detail-container-2col">
        <div className="program-detail-main">
          <img src={mainProgram.image} alt={mainProgram.title} className="program-detail-img" />
          <div className="program-detail-section">
            <h3>강좌소개</h3>
            <p>{mainProgram.description}</p>
          </div>
          <div className="program-detail-section">
            <h3>준비물/특이사항</h3>
            <p>{mainProgram.준비물}</p>
          </div>
          <div className="program-detail-section">
            <h3>유의사항</h3>
            <p>{mainProgram.유의사항}</p>
          </div>
        </div>
        <div className="program-detail-summary card-style">
          <div className="summary-header">
            <span className="badge gray-badge">{mainProgram.badge}</span>
            <span className="badge type-badge">{mainProgram.type}</span>
            <span className="summary-share"><FaShareAlt /></span>
          </div>
          <div className="summary-profile">
            <img src={mainProgram.image} alt={mainProgram.title} className="summary-img" />
            <div className="summary-title-group">
              <div className="summary-title">{mainProgram.title}</div>
              <div className="summary-teacher">{mainProgram.teacher}</div>
            </div>
          </div>
          <hr className="summary-divider" />
          <div className="summary-select-label">강좌를 선택하세요.</div>
          <select
            className="summary-select"
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
          >
            <option value="">선택하세요</option>
            {programs.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          {selectedProgram && (
            <div className="summary-detail-info">
              <table className="summary-info-table">
                <tbody>
                  {Object.entries(selectedProgram.info).map(([k, v]) => (
                    <tr key={k}>
                      <th>{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="summary-apply-btn" type="button">신청하기</button>
            </div>
          )}
          {!selectedProgram && (
            <>
              <button className="summary-apply-btn disabled" type="button" disabled>수강신청</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgramDetailPage; 