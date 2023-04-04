import { Route, Routes } from "react-router-dom";
import "./App.css";
import BaseLayout from "./components/layout/BaseLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";
import BoardList from "./components/board/board_list";

function App() {
  return (
    <div className="container">
      <h1>My shop</h1>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* 리스트를 연결한다.  */}
        <Route path="/board/list/:currentPage" element={<BoardList />}>
          <Route index element={<BoardList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
