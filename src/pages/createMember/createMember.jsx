import { useEffect, useState } from "react";
import { Container, InputBox } from "../createCoffee/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateMemberPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const createMember = async () => {
    try {
      await axios.post("http://localhost:8080/v12/members", {
        email,
        name,
        phone,
      });
      navigate("/members");
    } catch (error) {
      alert("회원 등록에 실패했습니다.");
    }
  };

  return (
    <Container>
      <InputBox
        type="text"
        value={email}
        placeholder="이메일을 입력해주세요."
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputBox
        type="text"
        value={name}
        placeholder="이름을 입력해주세요."
        onChange={(e) => setName(e.target.value)}
      />
      <InputBox
        type="text"
        value={phone}
        placeholder="휴대폰 번호를 입력해 주세요."
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={() => createMember()}>등록하기기</button>
    </Container>
  );
}
