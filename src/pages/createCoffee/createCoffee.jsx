import { useEffect, useState } from "react";
import { Container, InputBox } from "./styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateCoffeePage() {
  const navigate = useNavigate();

  const [korName, setKorName] = useState("");
  const [engName, setEngName] = useState("");
  const [price, setPrice] = useState(0);
  const [coffeeCode, setCoffeeCode] = useState("");

  const createCoffee = async () => {
    try {
      await axios.post("http://localhost:8080/v12/coffees", {
        korName,
        engName,
        price,
        coffeeCode,
      });
      navigate("/coffees");
    } catch (error) {
      alert("커피 등록에 실패했습니다");
    }
  };

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
        value={coffeeCode}
        placeholder="커피 코드를 입력해 주세요"
        onChange={(e) => setCoffeeCode(e.target.value)}
      />

      <button onClick={() => createCoffee()}>등록하기</button>
    </Container>
  );
}
