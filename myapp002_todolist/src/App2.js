// 상태전달 : Context API + useContext()
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Todo from "./components/todo2";
import Input from "./components/input2";
import { InputContext } from "./contexts/InputContext";
import { TodoContext } from "./contexts/TodoContext";

function App() {
  const inputRef = useRef("");
  const wrap = {
    width: "500px",
    border: "1px solid black",
    margin: "10px auto",
  };

  let boardList = [
    { id: 1, todoname: "운동하기", completed: 0 },
    { id: 2, todoname: "SNS꾸미기", completed: 0 },
    { id: 3, todoname: "사진정리하기", completed: 0 },
  ];

  const [todos, setTodos] = useState([...boardList]);
  const [input, setInput] = useState("");

  //statement는 반드시 함수를 통해서 변경을 해주어야함
  const handleChangeText = (e) => {
    setInput(e.target.value);
  };

  const insertTodo = (e) => {
    e.preventDefault(); //form이 submit 된 후에 페이지 이동이 되도록 설정되어있어서 이걸 막아줘야 새로운 항목을 넣어도 페이지 이동없이 출력됨
    setTodos([
      ...todos,
      { id: todos.length + 1, todoname: input, completed: 0 },
    ]);

    setInput("");
  };

  const deleteTodo = (id) => {
    //setTodos(todos.filter((todo)=>{return todo.id !== id})); // id가 같지 않은 값만 넘겨줘라(선택된 id는 삭제할 거니까 id가 같은 것은 지워야함)

    setTodos(todos.filter((todo) => todo.id !== id)); // 여러개 아니고 하나라 이렇게 써도됨
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  };

  useEffect(() => {
    inputRef.current.focus(); // 새로고침 했을 때 쓸 수 있는 창에 포커스 맞추기 , 리렌더링 후에 일어나기에 어떤 행동을 한 뒤에 포커스가 계속 맞춰짐
    console.log("useEffect");
  });

  return (
    <div className="App" style={wrap}>
      <h1>TODO LIST</h1>
      <InputContext.Provider
        value={{ insertTodo, input, handleChangeText, inputRef }}
      >
        <Input />
      </InputContext.Provider>

      <TodoContext.Provider value={{ todos, updateTodo, deleteTodo }}>
        <Todo />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
