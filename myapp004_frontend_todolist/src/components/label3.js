import { useSelector } from "react-redux";
import { deleteAction, updateAction } from "../reduxs/action";

// todo 받아오기
const Label = ({ todo }) => {
  const todos = useSelector((todos) => todos);

  const deleteTodo = (id) => {
    deleteAction(id);
  };

  const updateTodo = (id) => {
    const completed = todos.filter((todo) => todo.id === id)[0].completed;
    updateAction(id, completed);
  };

  return (
    <h3>
      {/* <label
        className={todo.completed === 1 ? "completed" : null}
        onClick={() => updateTodo(todo.id)}
      > */}

      <label
        className={todo.completed === 1 ? "completed" : null}
        onClick={() => updateTodo(todo.id)}
      >
        {todo.todoname}
      </label>

      {/* 바로 함수를 안에 넣어서 사용해도 된다. */}
      <label onClick={() => deleteTodo(todo.id)}>&nbsp;&nbsp;삭제</label>
    </h3>
  );
};
export default Label;
