const Label = (props) => {
  const { todo, updateTodo, deleteTodo } = props;
  return (
    <h3>
      <label
        className={todo.completed === 1 ? "completed" : null}
        onClick={() => {
          updateTodo(todo.id);
        }}
      >
        {todo.todoname}
      </label>
      <label //넘겨주는 parameter값이 없으면  onClick={deleteTodo} 이렇게 하면 되지만, 우리는 id값을 parameter로 넘기므로 쓰면안됨
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        &nbsp;&nbsp;삭제
      </label>
    </h3>
  );
};
export default Label;
