import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CommonList.css"; // 공통 CSS 파일 가져오기

function OrderList() {
  const [orders, setOrders] = useState([]); // 주문 데이터 저장
  const [pageInfo, setPageInfo] = useState(null); // 페이지 정보 저장
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pageSize = 5; // 한 페이지에 표시할 데이터 수

  useEffect(() => {
    // API 호출 함수
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v12/orders", {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });

        // 응답 데이터 처리
        setOrders(response.data.data); // MultiResponseDto의 data 필드
        setPageInfo(response.data.pageInfo); // pageInfo 필드
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrders();
  }, [currentPage]); // currentPage가 변경될 때마다 호출

  return (
    <div className="table-container">
      <h1 className="table-title">Order List</h1>

      {/* 테이블 형태로 데이터 표시 */}
      <table className="data-table">
        <thead>
          <tr>
            <th>주문 ID</th>
            <th>주문자 ID</th>
            <th>주문 상태</th>
            <th>주문 날짜</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.memberId}</td>
              <td>{order.orderStatus}</td>
              <td>{order.createdAt.slice(0, 10) || "N/A"}</td>{" "}
              {/* 주문 날짜가 없으면 N/A */}
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
    </div>
  );
}

export default OrderList;
