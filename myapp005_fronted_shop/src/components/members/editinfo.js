import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../apiurl";
import { useNavigate } from "react-router-dom";

const EditInfo = () => {
  const navigator = useNavigate();

  const [members, setMembers] = useState({
    memberEmail: "",
    memberPass: "",
    memberName: "",
    memberPhone: "",
  });

  const { memberEmail, memberPass, memberName, memberPhone } = members;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  // 로컬 스토리지에 있는 정보를 받아와서 넘겨준다.
  const info = async () => {
    return await axios
      .get(`${baseURL}/member/editinfo/${localStorage.memberEmail}`, config)
      .then((response) => {
        setMembers({ ...response.data, memberPass: "" });
      });
  };

  useEffect(() => {
    info();
  }, []);

  const [passwordCheck, setPasswordCheck] = useState("");

  const passChange = (e) => {
    e.preventDefault();
    // setMemberPass2(e) 하게 되면 이 처리보다 아래 처리가 조금 더 빠르다.
    if (memberPass !== e.target.value) setPasswordCheck("비밀번호 불일치");
    else setPasswordCheck("비밀번호 일치");
  };

  const handleValueChange = (e) => {
    e.preventDefault();
    setMembers({ ...members, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!memberPass) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    await axios.post(`${baseURL}/member/update`, members, config);
    localStorage.setItem("memberName", memberName);
    // navigator("/");
    window.location.replace("/");
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원정보 수정</h1>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="memberEmail"
              placeholder="이메일"
              value={localStorage.memberEmail}
              readOnly
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="memberPass"
              placeholder="비밀번호"
              value={memberPass}
              onChange={handleValueChange}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="memberPass2"
              placeholder="비밀번호 확인"
              onChange={passChange}
            />
            <span>{passwordCheck}</span>
          </div>

          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="memberName"
              placeholder="이름"
              value={memberName}
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="memberPhone"
              placeholder="연락처"
              value={memberPhone}
              onChange={handleValueChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            회원 정보 수정
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditInfo;
