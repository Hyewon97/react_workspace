import { useDispatch, useSelector } from "react-redux";
import Label from "./label3";
import { useEffect } from "react";
import { getAction } from "../reduxs/action";

const Todo = () => {
  const todos = useSelector((todos) => todos);
  const dispatch = useDispatch();

  //   const list = useSelector((list)=>list) // 리스트로 넘기는 방법도 있다.

  useEffect(() => {
    getAction(dispatch);
  }, []);

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
