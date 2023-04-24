import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../apiurl";

const JoinAdd = () => {
  const navigator = useNavigate();
  const [adminz, setAdminz] = useState({
    adminEmail: "",
    adminPass: "",
    adminProfile: "",
  });

  const config = { headers: { "Content-Type": "application/json" } };

  const onSubmit = async (e) => {
    // axios 처리... 리덕스로 처리 안함
    e.preventDefault();
    await axios
      .post(`${baseURL}/admin/signup`, adminz, config)
      .then((response) => {
        setAdminz({
          adminEmail: "",
          adminPass: "",
          adminProfile: "",
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

    setAdminz({ ...adminz, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원가입</h1>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="adminEmail"
              placeholder="이메일"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="adminPass"
              placeholder="비밀번호"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="adminProfile"
              placeholder="닉네임"
              onChange={handleValueChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            가입 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinAdd;
