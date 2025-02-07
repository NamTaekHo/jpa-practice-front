import { useLocation, useNavigate } from "react-router-dom";
import { Container, InputBox } from "./createCoffee/styled";
import axios from "axios";
import { useEffect, useState } from "react";

export function PatchMember() {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.pathname.split("/")[3];

  console.log(id);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [memberStatus, setMemberStatus] = useState("");

  const getMember = async () => {
    const response = await axios.get(`http://localhost:8080/v12/members/${id}`);
    setName(response.data.data.name);
    setPhone(response.data.data.phone);
    setMemberStatus(response.data.data.memberStatus);
  };

  const patchMember = async () => {
    try {
      await axios.patch(`http://localhost:8080/v12/members/${id}`, {
        memberId: id,
        name,
        phone,
        memberStatus,
      });
      navigate(`/members/${id}`);
    } catch (error) {
      alert("수정 실패!");
    }
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <Container>
      <InputBox
        type="text"
        value={name}
        placeholder="이름을 입력해주세요."
        onChange={(e) => setName(e.target.value)}
      />
      <InputBox
        type="text"
        value={phone}
        placeholder="휴대폰 번호를 입력해주세요"
        onChange={(e) => setPhone(e.target.value)}
      />
      <InputBox
        type="text"
        value={memberStatus}
        placeholder="상태를 입력해주세요"
        onChange={(e) => setMemberStatus(e.target.value)}
      />

      <button onClick={() => patchMember()}>수정</button>
    </Container>
  );
}
