import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../apiurl";

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    adminEmail: "",
    adminPass: "",
  });

  const { adminEmail, adminPass } = inputs;

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const config = { headers: { "Content-Type": "application/json" } };

  const onSubmit = async (e) => {
    // 입력한 데이터를 보내는 작업
    e.preventDefault();
    await axios
      .post(`${baseURL}/login`, inputs, config) // 비번 유출 방지
      .then((response) => {
        console.log("responese :", response.data);

        let jwtToken = response.headers.get("Authorization");
        console.log(jwtToken);

        let jwtAdminProfile = response.data.adminProfile;
        let jwtAdminEmail = response.data.adminEmail;
        let jwtAuthRole = response.data.authRole;

        localStorage.setItem("Authorization", jwtToken);
        localStorage.setItem("adminEmail", jwtAdminEmail);
        localStorage.setItem("adminProfile", jwtAdminProfile);
        localStorage.setItem("authRole", jwtAuthRole);
        localStorage.setItem("isLogin", "true");

        setInputs({ adminEmail: "", adminPass: "" });
      })
      .then((response) => {
        // navigator('/');
        window.location.replace("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="container text-center mt-5">
      <div className="mx-5">
        <h1>로그인</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group mt-1">
            <input
              type="email"
              name="adminEmail"
              className="form-control"
              id="adminEmail"
              value={adminEmail}
              placeholder="이메일"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mt-1">
            <input
              type="password"
              className="form-control"
              name="adminPass"
              id="adminPass"
              value={adminPass}
              placeholder="비밀번호"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="mt-1">
            <button type="submit" className="btn btn-primary">
              로그인
            </button>
            <Link className="btn btn-primary" to="/joinadd">
              회원 가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
