import { useLocation, useNavigate } from "react-router-dom";
import { Container, InputBox } from "./createCoffee/styled";
import axios from "axios";
import { useEffect, useState } from "react";

export function PatchCoffee() {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.pathname.split("/")[3];

  console.log(id);

  const [korName, setKorName] = useState("");
  const [engName, setEngName] = useState("");
  const [price, setPrice] = useState(0);
  const [coffeeStatus, setCoffeeStatus] = useState("");

  const getCoffee = async () => {
    const response = await axios.get(`http://localhost:8080/v12/coffees/${id}`);
    setKorName(response.data.data.korName);
    setEngName(response.data.data.engName);
    setPrice(response.data.data.price);
    setCoffeeStatus(response.data.data.coffeeStatus);
  };

  const patchCoffee = async () => {
    try {
      await axios.patch(`http://localhost:8080/v12/coffees/${id}`, {
        coffeeId: id,
        korName,
        engName,
        price,
        coffeeStatus,
      });
      navigate(`/coffees/${id}`);
    } catch (error) {
      alert("수정 실패");
    }
  };

  useEffect(() => {
    getCoffee();
  }, []);

  return (
    <Container>
      <InputBox
        type="text"
        value={korName}
        placeholder="한글 이름을 입력해주세요"
        onChange={(e) => setKorName(e.target.value)}
      />
      <InputBox
        type="text"
        value={engName}
        placeholder="영어 이름을 입력해주세요"
        onChange={(e) => setEngName(e.target.value)}
      />
      <InputBox
        type="text"
        value={price}
        placeholder="가격을 입력해 주세요"
        onChange={(e) => setPrice(e.target.value)}
      />
      <InputBox
        type="text"
        value={coffeeStatus}
        placeholder="커피 코드를 입력해 주세요"
        onChange={(e) => setCoffeeStatus(e.target.value)}
      />

      <button onClick={() => patchCoffee()}>수정</button>
    </Container>
  );
}
