import { NavLink, Outlet } from "react-router-dom";
function BaseLayout() {
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "green" : "",
    fontSize: isActive ? "1.2rem" : "",
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink style={activeStyle} className="nav-link" to="/">
                HOME
              </NavLink>
            </li>

            {localStorage.getItem("adminProfile") !== null ? (
              <>
                <li>
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="admin/update"
                  >
                    EDITINFO
                  </NavLink>
                </li>

                <li>
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
                <li className="nav-item">
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="admin/login"
                  >
                    LOGIN
                  </NavLink>
                </li>

                <li className="nav-item">
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
            <li className="nav-item">
              <NavLink
                style={activeStyle}
                className="nav-link"
                to="/board/list/1"
              >
                BOARD
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink style={activeStyle} className="nav-link" to="/talk/list">
                TALK
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

export default BaseLayout;
