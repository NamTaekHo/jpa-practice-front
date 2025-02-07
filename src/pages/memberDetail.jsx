import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function MemberDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const memberId = location.pathname;

  const [member, setMember] = useState({
    memberId: 0,
    email: "",
    name: "",
    phone: "",
    memberState: "",
    stampCount: 0,
  });

  const fetchMemberData = async () => {
    // 서버에서 데이터 가져오기
    const response = await axios.get(`http://localhost:8080/v12${memberId}`);

    // set 함수 실행
    setMember(response.data.data);
  };

  useEffect(() => {
    fetchMemberData();
  }, []);

  return (
    <div>
      <div>멤버 상세 페이지</div>
      <div>{member.memberId}</div>
      <div>{member.email}</div>
      <div>{member.name}</div>
      <div>{member.phone}</div>
      <div>{member.memberState}</div>
      <div>{member.stampCount}</div>
      <button onClick={() => navigate(`/patch/member/${member.memberId}`)}>
        수정
      </button>
    </div>
  );
}
