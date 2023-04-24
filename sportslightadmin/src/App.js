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
