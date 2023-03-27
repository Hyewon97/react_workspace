import logo from "./logo.svg";
import "./App.css";
import MyJsx001 from "./components/ex01_jsx/MyJsx001";
import MyJsx002 from "./components/ex01_jsx/MyJsx002";
import MyJsx003 from "./components/ex01_jsx/MyJsx003";

function App() {
  return (
    <div className="App">
      {/* 정의한 함수 넣기 */}
      {/* <MyJsx001 /> */}
      {/* <MyJsx002 /> */}
      <MyJsx003 />
    </div>
  );
}

export default App;
