import { useDispatch } from "react-redux";

// todo 받아오기
const Label = ({ todo }) => {
  const dispatch = useDispatch();

  // 함수 정의해서 해도 되고
  //   const deleteTodo = (id) => {
  //     dispatch({ type: "DELETE", id: id });
  //   };

  //   const updateTodo = (id) => {
  //     dispatch({ type: "UPDATE", id: id });
  //   };

  return (
    <h3>
      {/* <label
        className={todo.completed === 1 ? "completed" : null}
        onClick={() => updateTodo(todo.id)}
      > */}

      <label
        className={todo.completed === 1 ? "completed" : null}
        onClick={() => dispatch({ type: "UPDATE", id: todo.id })}
      >
        {todo.todoname}
      </label>

      {/* <label onClick={() => deleteTodo(todo.id)}>&nbsp;&nbsp;삭제</label> */}

      {/* 바로 함수를 안에 넣어서 사용해도 된다. */}
      <label onClick={() => dispatch({ type: "DELETE", id: todo.id })}>
        &nbsp;&nbsp;삭제
      </label>
    </h3>
  );
};
export default Label;
