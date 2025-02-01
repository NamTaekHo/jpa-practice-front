import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function CoffeeDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const coffeeId = location.pathname;

  const [coffee, setCoffee] = useState({
    coffeeId: 0,
    korName: "",
    engName: "",
    price: 0,
    coffeeStatus: "",
  });

  const fetchCoffeeData = async () => {
    // 서버로부터 데이터 받아오는 axios 함수
    const response = await axios.get(`http://localhost:8080/v12${coffeeId}`);

    // set 함수를 실행
    setCoffee(response.data.data);
  };

  useEffect(() => {
    fetchCoffeeData();
  }, []);

  return (
    <div>
      <div>커피 상세 페이지</div>
      <div>{coffee.coffeeId}</div>
      <div>{coffee.korName}</div>
      <div>{coffee.engName}</div>
      <div>{coffee.price}</div>
      <button onClick={() => navigate(`/patch/coffee/${coffee.coffeeId}`)}>
        수정
      </button>
    </div>
  );
}
