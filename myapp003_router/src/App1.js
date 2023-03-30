// V6 (설치한 버전)
// npm install react-router-dom --save

import { Route, Routes } from "react-router-dom";
import About from "./components1/About";
import Dashboard from "./components1/Dashboard";
import Home from "./components1/Home";
import Layout from "./components1/Layout";
import NoMatch from "./components1/NoMatch";

const App = () => {
  return (
    <div>
      <h1>Basic Example</h1>
      <Routes>
        {/* 해당 url을 호출하면 해당 페이지가 실행된다고 */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* Layout가 먼저 실행이 되고  */}
        {/* 전체 path의 경로가 /dashboard와 같아야 하기에 부모 Route path가 에 /가 있으므로 자식 루트에는 /가 없어야 한다. */}
        <Route path="/" element={<Layout />}>
          {/* 상위 path와 경로가 같으면 index로 준다... 부모와 자식이 경로가 같으면 */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* 페이지가 없는 경우 *로 경로를 설정한다. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
