// dispatch를 사용할거면 todos 타입을 아무거나 넘겨도 된다.
export const reducer = (todos, action) => {
  // todos에서 값을 받아옴
  switch (action.type) {
    // case "INSERT": // 추가
    //   return [
    //     ...todos,
    //     { id: todos.length + 1, todoname: action.todoname, completed: 0 }, // insert면 이 친구를 넘겨준다.
    //   ];

    // case "DELETE": // 삭제... 액션 타입이 DELETE 이면
    //   return todos.filter((todo) => todo.id !== action.id); // 조건을 만족하면.. 아이디가 같지 않으면

    // // 수정
    // case "UPDATE":
    //   return todos.map((todo) =>
    //     todo.id === action.id
    //       ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
    //       : todo
    //   );

    // DB에 있는걸 여기에 저장 해야 한다.
    case "LIST": //목록
      return (todos = action.todos); // insert가 아니면 목록을 넘겨준다.
    default:
      return null;
  }
};
