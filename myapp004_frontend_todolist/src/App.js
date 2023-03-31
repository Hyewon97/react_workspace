import "./App.css";
import { useRef, useState, useEffect } from "react";

// 사용 안하는거는 아예 임포트도 하지 말기.. 오류가 나올수도 있다.
import axios from "axios";
import { baseURL } from "./apiurl";

function App() {
  const inputRef = useRef("");

  const wrap = {
    width: "500px",
    border: "1px solid black",
    margin: "10px auto",
  };

  // let boardList = [
  //   // 안에 값이 하나도 없으면 네모가 줄로 보임.. 이걸 방지하기 위해 아래에..A
  //   { id: 1, todoname: "운동하기", completed: 0 },
  //   { id: 2, todoname: "SNS 꾸미기", completed: 0 },
  //   { id: 3, todoname: "사진정리하기", completed: 0 },
  // ];

  // 입력한 값이 아래에 저장이 되어야 한다.

  // 제거를 할 때는 setTodos에서 제거를 시켜주면 된다.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleChangeText = (e) => {
    setInput(e.target.value);
  };

  const insertTodo = async (e) => {
    e.preventDefault();

    await axios
      .post(baseURL + "/todo/", { todoname: input })
      .then((response) => {
        console.log(response.data);
        setInput("");
        getTodos();
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

  // async function getTodos(){}
  const getTodos = async () => {
    await axios
      .get(`${baseURL}/todo/all`) //.get(baseUrl+'/todo/all')
      .then((Response) => {
        console.log(Response);
        console.log("111111111");
        setTodos(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("222222222");
  };

  useEffect(() => {
    getTodos(); // 호출하기
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [input]);

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
                      className={todo.completed === 1 ? "completed" : null}
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
