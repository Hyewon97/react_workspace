//
// 상태전달 : Context API + useContext() + useDispatch()
import "./App.css";
import Todo from "./components/todo3";
import Input from "./components/input3";
import { store } from "./reduxs/store";
import { Provider } from "react-redux";

function App() {
  const wrap = {
    width: "500px",
    border: "1px solid black",
    margin: "10px auto",
  };

  return (
    <div className="App" style={wrap}>
      <h1>TODO LIST(Redux)</h1>
      <Provider store={store}>
        {/* 아래 애들이 store에 접근 가능하다. */}
        <Input />
        <Todo />
      </Provider>
    </div>
  );
}

export default App;
