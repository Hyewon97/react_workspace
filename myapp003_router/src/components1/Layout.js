import { Link, NavLink, Outlet } from "react-router-dom";

// 스타일 정의
// 버전이 업그레이드 되면서 이 방법을 사용해야 한다.

// 스타일을 적용하고 싶으면 navLink를 이용해서 작업을 해줘야 한다.
const activeStyle = (isActive) => {
  return {
    color: isActive ? "green" : "",
    fontSize: isActive ? "2rem" : "",
  };
};
const Layout = () => {
  return (
    <div>
      {/* 메뉴 생성 */}
      <nav>
        <ul>
          <li>
            <NavLink to="/" style={activeStyle}>
              Home
            </NavLink>
          </li>

          <li>
            {/* link to는 a와 같은 역할이다. */}
            {/* a href는 전체 페이지 리로딩 하고 link는 현재 페이지만 리로딩 시키는듯 */}
            {/* <a> 요소는 전체를 렌더링 함으로 <Link> 또는 <NavLink>을 사용한다 */}
            {/* <a href="/about">About</a> */}
            <NavLink to="/about">About</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/nothing-here">Nothing Here</NavLink>
          </li>
        </ul>
      </nav>

      {/* 수평선 =hr, 메뉴에 해당되는 내용 출력하기 = Outlet */}
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
