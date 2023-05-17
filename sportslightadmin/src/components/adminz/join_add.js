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
    setAdminz({ ...adminz, [e.target.name]: e.target.value });
  };

  return (
    <div className="container text-center mt-5">
      <h1 style={{ marginBottom: 50 }}>회원가입</h1>
      <form onSubmit={onSubmit} style={{ marginTop: 100 }}>
        <div className="container">
          <div
            className="form-group mb-1"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              type="email"
              className="form-control"
              name="adminEmail"
              placeholder="이메일"
              onChange={handleValueChange}
              style={{ width: "50%" }}
            />
          </div>
          <div
            className="form-group mb-1"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              type="password"
              className="form-control"
              name="adminPass"
              placeholder="비밀번호"
              onChange={handleValueChange}
              style={{ width: "50%" }}
            />
          </div>
          <div
            className="form-group mb-1"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              type="text"
              className="form-control"
              name="adminProfile"
              placeholder="닉네임"
              onChange={handleValueChange}
              style={{ width: "50%" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "black",
              borderStyle: "none",
              color: "white",
            }}
          >
            가입 하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinAdd;
