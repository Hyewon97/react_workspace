import { Route, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseLayout from "./components/layout/BaseLayout";

import Home from "./components/home";
import BoardList from "./components/board/board_list";
import BoardView from "./components/board/board_view";
import BoardWrite from "./components/board/board_write";
import BoardUpdate from "./components/board/board_update";
import JoinAdd from "./components/adminz/join_add";
import LoginPage from "./components/adminz/login";
import LogOut from "./components/adminz/logout";
import PrivateRoute from "./access/PrivateRoute";
import Talklist from "./components/talk/talk_list";
import Update from "./components/adminz/update";
import NoticeList from "./components/notice/notice_list";
import NoticeWrite from "./components/notice/notice_write";
import NoticeView from "./components/notice/notice_view";
import NoticeUpdate from "./components/notice/notice_update";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route
            path="admin/update"
            element={<PrivateRoute isAuth={true} RouteComponent={Update} />}
          />

          <Route
            path="admin/logout"
            element={<PrivateRoute isAuth={true} RouteComponent={LogOut} />}
          />
          <Route
            path="admin/login"
            element={<PrivateRoute isAuth={false} RouteComponent={LoginPage} />}
          />
          <Route
            path="admin/signup"
            element={<PrivateRoute isAuth={false} RouteComponent={JoinAdd} />}
          />

          {/* 보드 */}
          <Route
            path="board/list/:currentPage"
            element={<PrivateRoute isAuth={false} RouteComponent={BoardList} />}
          />
          <Route
            path="board/view/:num"
            element={<PrivateRoute isAuth={true} RouteComponent={BoardView} />}
          />
          <Route
            path="board/write"
            element={<PrivateRoute isAuth={true} RouteComponent={BoardWrite} />}
          />
          <Route
            path="board/write/:num"
            element={<PrivateRoute isAuth={true} RouteComponent={BoardWrite} />}
          />
          <Route
            path="board/update/:num"
            element={
              <PrivateRoute isAuth={true} RouteComponent={BoardUpdate} />
            }
          />

          {/* 공지사항 */}
          <Route
            path="admin/notice/list/:currentPage"
            element={
              <PrivateRoute isAuth={false} RouteComponent={NoticeList} />
            }
          />

          <Route
            path="/admin/notice/view/:num"
            element={<PrivateRoute isAuth={true} RouteComponent={NoticeView} />}
          />

          <Route
            path="/admin/notice/update/:num"
            element={
              <PrivateRoute isAuth={true} RouteComponent={NoticeUpdate} />
            }
          />

          <Route
            path="/admin/notice/write"
            element={
              <PrivateRoute isAuth={true} RouteComponent={NoticeWrite} />
            }
          />

          {/*  */}

          <Route
            path="talk/list/"
            element={<PrivateRoute isAuth={false} RouteComponent={Talklist} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
