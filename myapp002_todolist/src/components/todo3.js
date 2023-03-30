import { useDispatch, useSelector } from "react-redux";
import Label from "./label3";

const Todo = () => {
  const todos = useSelector((todos) => todos);

  //   const list = useSelector((list)=>list) // 리스트로 넘기는 방법도 있다.

  return (
    <>
      {todos
        ? todos.map((todo) => {
            return (
              <div className="todo" key={todo.id}>
                <Label todo={todo} />
              </div>
            );
          })
        : null}
    </>
  );
};

export default Todo;
