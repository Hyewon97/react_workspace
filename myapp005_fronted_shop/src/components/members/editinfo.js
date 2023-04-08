import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../apiurl";

const EditInfo = () => {
  const navigator = useNavigate();
  const [members, setMembers] = useState({
    memberEmail: "",
    memberPass: "",
    memberName: "",
    memberPhone: "",
  });

  const config = { headers: { "Content-Type": "application/json" } };

  const onSubmit = async (e) => {
    // axios 처리... 리덕스로 처리 안함
    e.preventDefault();
    await axios
      .post(`${baseURL}/member/editinfo`, members, config)
      .then((response) => {
        setMembers({
          memberEmail: "",
          memberPass: "",
          memberName: "",
          memberPhone: "",
        });
      })
      .then((response) => {
        navigator("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleValueChange = (e) => {
    // radio 버튼에서는 e.preventDefault()를 하면 더블클릭을 해줘야 한다.
    // e.preventDefaul();

    setMembers({ ...members, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원원정보 수정</h1>
          <div className="form-group mb-1">
            <input
              type="type"
              className="form-control"
              readOnly
              value={localStorage.getItem("memberEmail")}
              name="memberEmail"
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="memberPass"
              placeholder="비밀번호"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="memberName"
              placeholder="이름"
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="memberPhone"
              placeholder="연락처"
              onChange={handleValueChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            수정
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditInfo;
