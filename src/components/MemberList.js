import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CommonList.css"; // 공통 CSS 파일 가져오기
import { useNavigate } from "react-router-dom";

function MemberList() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]); // 멤버 데이터 저장
  const [pageInfo, setPageInfo] = useState(null); // 페이지 정보 저장
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pageSize = 5; // 한 페이지에 표시할 데이터 수

  useEffect(() => {
    // API 호출 함수
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v12/members", {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });

        // 응답 데이터 처리
        setMembers(response.data.data); // MultiResponseDto-data 필드
        setPageInfo(response.data.pageInfo); // pageInfo 필드
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMembers();
  }, [currentPage]); // currentPage 변경될 때마다 호출

  return (
    <div className="table-container">
      <h1 className="table-title">Member List</h1>

      {/* 테이블 형태로 데이터 표시 */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Stamp</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.memberId}
              onClick={() => navigate(`/members/${member.memberId}`)}
            >
              <td>{member.name}</td>
              <td>{member.phone}</td>
              <td>{member.email}</td>
              <td>{member.memberStatus}</td>
              <td>{member.stampCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      {pageInfo && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Prev
          </button>
          <span className="pagination-info">
            Page {pageInfo.page} of {pageInfo.totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageInfo.totalPages))
            }
            disabled={currentPage === pageInfo.totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}

      {/* 회원 등록 버튼 */}
      <button onClick={() => navigate("/create/member")}>회원 등록</button>
    </div>
  );
}

export default MemberList;
