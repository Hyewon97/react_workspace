import { NavLink, Outlet } from "react-router-dom";
function BaseLayout() {
  return (
    <div>
      <nav>
        {/* 헤더 */}
        <div>
          <>
            <NavLink to="/main">
              <img src="/images/logo.png" height="50rem" width="120rem" />
            </NavLink>
          </>
          <ul>
            <li>
              <NavLink to="/category">리그영상</NavLink>
            </li>

            <li>
              <NavLink to="/schedule">경기일정</NavLink>
            </li>

            <li>
              <NavLink to="/talklist">커뮤니티</NavLink>
            </li>

            <li>검색</li>

            <li>
              <NavLink to="/mypage">MyPage</NavLink>
            </li>
          </ul>
        </div>
        {/* 헤더 끝 */}

        {/* 카테고리 영역. 추후에 지울거임 */}
        <div>
          <ul>
            <li>회원정보 관련</li>
            <li>
              {/* 로그인 */}
              <NavLink to="/">Login</NavLink>
            </li>

            <li>
              {/* 회원가입 */}
              <NavLink to="/signup">Signup</NavLink>
            </li>

            <li>
              {/* 회원정보 수정 */}
              <NavLink to="/editinfo">EditInfo</NavLink>
            </li>

            <li>
              {/* 마이페이지 첫 화면 */}
              <NavLink to="/mypage">mypage</NavLink>
            </li>

            <li>
              {/* 회원탈퇴 */}
              <NavLink to="/withdraw">Withdraw</NavLink>
            </li>
            <hr />
            <li>메인 페이지 관련</li>
            <li>
              {/* 메인 페이지 */}
              <NavLink to="/main">Main</NavLink>
            </li>
            <hr />
            <li>마이 페이지 관련</li>
            <li>
              {/* 즐겨찾기  */}
              <NavLink to="/myvideo">myvideo</NavLink>
            </li>

            <li>
              {/* 나의 팀/리그  */}
              <NavLink to="/myteam">myteam</NavLink>
            </li>

            <li>
              {/* 공지사항  */}
              <NavLink to="/notice">notice</NavLink>
            </li>

            <li>
              {/* 자주 묻는 질문  */}
              <NavLink to="/qna">qna</NavLink>
            </li>
            <hr />
            <li>커뮤니티 관련</li>
            <li>
              {/* 경기토크 */}
              <NavLink to="/talklist">talklist</NavLink>
            </li>

            <li>
              {/* 토크 글쓰기 */}
              <NavLink to="/writetalk">writetalk</NavLink>
            </li>

            <li>
              {/* 토크 글 보기 */}
              <NavLink to="/viewtalk">viewtalk</NavLink>
            </li>

            <li>
              {/* 토크 글 수정 */}
              <NavLink to="/updatetalk">updatetalk</NavLink>
            </li>
            <hr />
            <li>검색 관련</li>
            <li>
              {/* 카테고리 검색  */}
              <NavLink to="/category">category</NavLink>
            </li>

            <li>
              {/* 키워드 검색  */}
              <NavLink to="/search">search</NavLink>
            </li>
            <hr />
            <li>일정 관련</li>
            <li>
              {/* 오늘의 경기  */}
              <NavLink to="/schedule">schedule</NavLink>
            </li>

            <li>
              {/* 키워드 검색  */}
              <NavLink to="/prediction">prediction</NavLink>
            </li>
          </ul>
        </div>
        {/* 카테고리 영역 끝 */}
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

export default BaseLayout;
