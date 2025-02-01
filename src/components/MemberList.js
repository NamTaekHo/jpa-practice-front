import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CommonList.css"; // 공통 CSS 파일 가져오기

function MemberList() {
  const [members, setMembers] = useState([]); // 멤버 데이터 저장
  const [pageInfo, setPageInfo] = useState(null); // 페이지 정보 저장
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pageSize = 5; // 한 페이지에 표시할 데이터 수

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal 상태 관리

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

  // 입력 폼 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 회원 생성 함수
  const createMember = async () => {
    try {
      if (!formData.name || !formData.phone || !formData.email) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      await axios.post("http://localhost:8080/members", formData);

      // 새로고침해서 멤버리스트 갱신
      setCurrentPage(1);
      // form 초기화
      setFormData({ name: "", phone: "", email: "" });
      setIsModalOpen(false); // Modal 닫기
    } catch (error) {
      console.error("회원 등록에 실패하였습니다. :", error);
    }
  };

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
            <tr key={member.memberId}>
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
      <button onClick={() => setIsModalOpen(true)} className="show-form-button">
        회원 등록
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>회원 등록록</h2>
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요."
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="전화번호를 입력해주세요."
              value={formData.phone}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              <button onClick={createMember} className="create-member-button">
                등록
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cancel-button"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberList;
