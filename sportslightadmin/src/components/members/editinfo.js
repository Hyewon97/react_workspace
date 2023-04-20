import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../apiurl";
import { useNavigate } from "react-router-dom";

const EditInfo = () => {
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
      .get(`${baseURL}/adminz/editinfo/${localStorage.adminEmail}`, config)
      .then((response) => {
        setAdminz({ ...response.data, adminPass: "" });
      });
  };

  useEffect(() => {
    info();
  }, []);

  const [passwordCheck, setPasswordCheck] = useState("");

  const passChange = (e) => {
    e.preventDefault();

    if (adminPass !== e.target.value) setPasswordCheck("비밀번호 불일치");
    else setPasswordCheck("비밀번호 일치");
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
              name="adminEmail"
              placeholder="이메일"
              value={localStorage.adminEmail}
              readOnly
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="adminPass"
              placeholder="비밀번호"
              value={adminPass}
              onChange={handleValueChange}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="adminPass2"
              placeholder="비밀번호 확인"
              onChange={passChange}
            />
            <span>{passwordCheck}</span>
          </div>

          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="adminProfile"
              placeholder="닉네임"
              value={adminProfile}
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
