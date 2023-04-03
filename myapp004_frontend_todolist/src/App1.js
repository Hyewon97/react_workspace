// 상태전달 : props
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Todo from "./components/todo1";
import Input from "./components/input1";
import axios from "axios";
import { baseURL } from "./apiurl";

function App() {
  const inputRef = useRef("");
  const wrap = {
    width: "500px",
    border: "1px solid black",
    margin: "10px auto",
  };

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //statement는 반드시 함수를 통해서 변경을 해주어야함
  const handleChangeText = (e) => {
    setInput(e.target.value);
  };

  // 데이터 삽입
  const insertTodo = async (e) => {
    e.preventDefault();

    await axios
      .post(baseURL + "/todo/", { todoname: input })
      .then((response) => {
        console.log(response.data);
        setInput("");
        getTodos(); // DB에 있는것을 가지고 오도록 함
      });
    setInput("");
  };

  const deleteTodo = async (id) => {
    await axios
      .delete(baseURL + "/todo/" + id)
      .then((response) => {
        console.log(response.data);
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTodo = async (id) => {
    console.log("id:" + id);
    console.log(todos.filter((todo) => todo.id === id));

    let completed = todos.filter((todo) => todo.id === id)[0].completed;
    console.log("data : " + completed);

    // 아래처럼 하면 복잡하니까 백틱 사용해서 하는게 편할수도
    await axios
      .put(baseURL + "/todo/" + id + "/" + completed)
      .then((response) => {
        console.log(response.data);
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DB 접근해서 오기
  // useEffect에서 불러다 쓸 예정
  const getTodos = async () => {
    await axios
      .get(`${baseURL}/todo/all`) //.get(baseUrl+'/todo/all')
      .then((Response) => {
        console.log(Response);
        setTodos(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    inputRef.current.focus(); // 새로고침 했을 때 쓸 수 있는 창에 포커스 맞추기 , 리렌더링 후에 일어나기에 어떤 행동을 한 뒤에 포커스가 계속 맞춰짐
    console.log("useEffect");
  });

  // getTodos,  DB에 있는 것을 가지고 온다
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App" style={wrap}>
      <h1>TODO LIST</h1>
      <Input
        insertTodo={insertTodo}
        input={input}
        handleChangeText={handleChangeText}
        inputRef={inputRef}
      />

      <Todo todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
