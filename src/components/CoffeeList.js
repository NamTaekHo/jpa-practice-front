import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CoffeeList.css"; // CSS 파일 추가
import { useNavigate } from "react-router-dom";

function CoffeeList() {
  const navigate = useNavigate();

  const [coffees, setCoffees] = useState([]); // 커피 데이터 저장
  const [pageInfo, setPageInfo] = useState(null); // 페이지 정보 저장
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pageSize = 6; // 한 페이지에 표시할 데이터 수

  useEffect(() => {
    // API 호출 함수
    const fetchCoffees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v12/coffees", {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });

        // 응답 데이터 처리
        setCoffees(response.data.data); // MultiResponseDto의 data 필드
        setPageInfo(response.data.pageInfo); // pageInfo 필드
      } catch (error) {
        console.error("Error fetching coffee data:", error);
      }
    };

    fetchCoffees();
  }, [currentPage]); // currentPage가 변경될 때마다 호출

  return (
    <div className="coffee-list-container">
      <h1 className="coffee-list-title">Coffees</h1>
      <ul className="coffee-list">
        {coffees.map((coffee) => (
          <li
            onClick={() => navigate(`/coffees/${coffee.coffeeId}`)}
            key={coffee.coffeeId}
            className="coffee-item"
          >
            {/* 이미지가 없으므로 임시 이미지 사용 */}
            <img
              src={coffee.image || "../coffee.png"}
              alt={coffee.korName}
              className="coffee-image"
            />
            <div className="coffee-info">
              <h2 className="coffee-name">{coffee.korName}</h2>
              <p className="coffee-price">{coffee.price}원</p>
            </div>
          </li>
        ))}
      </ul>

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
          <button onClick={() => navigate("/create/coffee")}>커피 등록</button>
        </div>
      )}
    </div>
  );
}

export default CoffeeList;
