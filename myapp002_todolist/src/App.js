import "./App.css";
import { useRef, useState, useEffect } from "react";

function App() {
  const inputRef = useRef("");

  const wrap = {
    width: "500px",
    border: "1px solid black",
    margin: "10px auto",
  };

  let boardList = [
    // 안에 값이 하나도 없으면 네모가 줄로 보임.. 이걸 방지하기 위해 아래에..A
    { id: 1, todoname: "운동하기", completed: 0 },
    { id: 2, todoname: "SNS 꾸미기", completed: 0 },
    { id: 3, todoname: "사진정리하기", completed: 0 },
  ];

  // 입력한 값이 아래에 저장이 되어야 한다.

  // 제거를 할 때는 setTodos에서 제거를 시켜주면 된다.
  const [todos, setTodos] = useState([...boardList]);
  const [input, setInput] = useState("");

  const handleChangeText = (e) => {
    setInput(e.target.value);
  };

  const insertTodo = (e) => {
    //  {/* 현재 기본 페이지 이동하는 것을 막기 */}
    e.preventDefault();

    // 기존의 있는 값을 가지고 오고 길이는 하나 증가하고 todoname은 입력값으로 설정한다.
    setTodos([
      ...todos,
      { id: todos.length + 1, todoname: input, completed: 0 },
    ]);

    setInput(""); // 입력값을 다시 null로 바꿔서 새로운 입력을 받을 수 있도록 하는듯
    // 폼 때문에 바로 초기화가 됨
  };

  // 삭제할 수 있는 버튼 생성
  // 아이디가 같으면 삭제를 하고 아이디가 같지 않으면 삭제하지 않는다... 값을 넘겨준다.
  const deleteTodo = (id) => {
    //
    // 출력값이 하나이면 중괄호는 생략 가능하다.
    // setTodos(
    //   todos.filter((todo) => {
    //     return todo.id !== id;
    //   })
    // );

    setTodos(todos.filter((todo) => todo.id !== id)); // 같지 않는 값만 리턴해서 setTodos에 저장한다.
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

  // 리턴 넣어서 작업하기
  // const updateTodo = (id) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       return todo.id === id
  //         ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
  //         : todo;
  //     })
  //   );
  // };

  useEffect(() => {
    inputRef.current.focus();
    console.log("useEffect");
  });

  return (
    <div className="App" style={wrap}>
      <h1>TODO LIST</h1>
      {/* 입력 받을 수 있는 폼 */}
      {/* 서브밋 이벤트가 발생하면 insertTodo를 실행하라 */}

      <form onSubmit={insertTodo} action="#">
        <input
          type="text"
          required={true}
          value={input}
          onChange={handleChangeText}
          ref={inputRef}
        />
        <input type="submit" value="Create" />
      </form>
      {
        // (todo) 값을 받아온다.
        // A 조건문을 추가한다.
        todos
          ? todos.map((todo) => {
              return (
                <div className="todo" key={todo.id}>
                  <h3>
                    {/* 클릭 이벤트가 발생되면 updateTodo가 동작되도록 */}
                    <label
                      className={todo.completed == 1 ? "completed" : null}
                      onClick={() => {
                        updateTodo(todo.id);
                      }}
                    >
                      {todo.todoname}
                    </label>
                    <label
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      &nbsp;&nbsp;삭제
                    </label>
                  </h3>
                </div>
              );
            })
          : null
      }
    </div>
  );
}

export default App;
