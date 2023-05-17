import { NavLink, Outlet } from "react-router-dom";
function BaseLayout() {
  // nav 선택했을 때, 스타일 변경
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "#00ff33" : "white",
    fontSize: isActive ? "1.2rem" : "1.2rem",
    fontWeight: isActive ? "bold" : "",
  });

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ marginBottom: "30px" }}
      >
        <div className="container-fluid">
          <ul className="navbar-nav mr-auto">
            {/* 로그인을 안한 상태이면 홈 이동 가능하게 */}
            {localStorage.getItem("adminProfile") === null ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <img
                    src="/images/logo.png"
                    width="100%"
                    height="45"
                    alt="Logo"
                  />
                </NavLink>
              </li>
            ) : (
              // 로그인을 한 상태면 이동 불가
              <li className="nav-item">
                <NavLink className="nav-link">
                  <img
                    src="/images/logo.png"
                    width="100%"
                    height="45"
                    alt="Logo"
                  />
                </NavLink>
              </li>
            )}

            {localStorage.getItem("adminProfile") !== null ? (
              <>
                <li style={{ marginTop: "10px" }}>
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="admin/update"
                  >
                    EDITINFO
                  </NavLink>
                </li>

                <li style={{ marginTop: "10px" }}>
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="admin/logout"
                  >
                    {localStorage.getItem("adminProfile") + "LOGOUT"}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item" style={{ marginTop: "10px" }}>
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="admin/login"
                  >
                    LOGIN
                  </NavLink>
                </li>

                <li className="nav-item" style={{ marginTop: "10px" }}>
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="admin/signup"
                  >
                    JOIN
                  </NavLink>
                </li>
              </>
            )}

            {localStorage.getItem("adminProfile") !== null ? (
              <>
                <li className="nav-item" style={{ marginTop: "10px" }}>
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="/admin/notice/list/1"
                  >
                    공지게시판
                  </NavLink>
                </li>
                <li className="nav-item" style={{ marginTop: "10px" }}>
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="/admin/footballTalk/list/1"
                  >
                    토크게시판
                  </NavLink>
                </li>

                <li className="nav-item" style={{ marginTop: "10px" }}>
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="/admin/member/list/1"
                  >
                    회원관리
                  </NavLink>
                </li>

                <li className="nav-item" style={{ marginTop: "10px" }}>
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="/admin/video/list/1"
                  >
                    비디오
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default BaseLayout;
