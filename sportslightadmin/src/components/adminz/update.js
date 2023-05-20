import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../apiurl";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigator = useNavigate();

  const [adminz, setAdminz] = useState({
    adminEmail: "",
    adminPass: "",
    adminProfile: "",
  });

  const { adminEmail, adminPass, adminProfile } = adminz;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  // 로컬 스토리지에 있는 정보를 받아와서 넘겨준다.
  const info = async () => {
    return await axios
      .get(`${baseURL}/admin/update/${localStorage.adminEmail}`, config)
      .then((response) => {
        setAdminz({ ...response.data, adminPass: "" });
      });
  };

  // 탈퇴
  const adminWithdraw = async () => {
    if (!localStorage.adminEmail) {
      console.error("localStorage.adminEmail is not defined");
      return;
    }

    await axios.delete(
      `${baseURL}/admin/withdraw/${localStorage.adminEmail}`,
      config
    );

    alert("탈퇴되었습니다.");
    navigator("/admin/logout");
  };

  useEffect(() => {
    info();
  }, []);

  const [passwordCheck, setPasswordCheck] = useState("");

  const passChange = (e) => {
    e.preventDefault();

    if (adminPass !== e.target.value) {
      setPasswordCheck(<span style={{ color: "red" }}>비밀번호 불일치</span>);
    } else {
      setPasswordCheck(<span style={{ color: "green" }}>비밀번호 일치</span>);
    }
  };

  const handleValueChange = (e) => {
    e.preventDefault();
    setAdminz({ ...adminz, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!adminPass) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    await axios.post(`${baseURL}/admin/update`, adminz, config);
    localStorage.setItem("adminProfile", adminProfile);

    window.location.replace("/admin/notice/list/1");
  };

  return (
    <div className="container text-center mt-5">
      <div style={{ marginBottom: 50 }}>
        <h1>정보 수정</h1>
        {/* 탈퇴 */}
        <button
          style={{ marginLeft: "80%", fontSize: "13px" }}
          className="btn btn-outline-danger"
          onClick={adminWithdraw}
        >
          관리자 탈퇴
        </button>
        <div style={{ display: "flex", alignItems: "center" }}></div>
      </div>
      <form onSubmit={onSubmit}>
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
              value={localStorage.adminEmail}
              readOnly
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
              value={adminPass}
              onChange={handleValueChange}
              style={{ width: "50%" }}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div
            className="form-group mb-1"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              type="password"
              className="form-control"
              name="adminPass2"
              placeholder="비밀번호 확인"
              onChange={passChange}
              style={{ width: "50%" }}
            />
          </div>
          <div style={{ marginRight: "40%" }}>{passwordCheck}</div>

          <div
            className="form-group mb-1"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              type="text"
              className="form-control"
              name="adminProfile"
              placeholder="닉네임"
              value={adminProfile}
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
            정보 수정
          </button>
        </div>
      </form>
    </div>
  );
};
export default Update;
