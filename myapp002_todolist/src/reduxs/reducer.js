let boardList = [
  { id: 1, todoname: "운동하기", completed: 0 },
  { id: 2, todoname: "SNS꾸미기", completed: 0 },
  { id: 3, todoname: "사진정리하기", completed: 0 },
];

// 사용할 데이터를 선언해줌(todos에, 사용할 액션을 타입에 담아서 넘겨준다.)
// 사용할 초기값과 액션값을 넘겨주고 실행될 때 액션 값을 넘겨준다.

// 리듀서에서 저장된 값을 store에 넘겨준다?
// 리턴 값이 바로 아래 todos에 저장이 된다. 기존의 데이터를 복사하고 넘겨줘야 함

// dispatch를 사용할거면 todos 타입을 아무거나 넘겨도 된다.
export const reducer = (todos = boardList, action) => {
  switch (action.type) {
    case "INSERT": // 추가
      return [
        ...todos,
        { id: todos.length + 1, todoname: action.todoname, completed: 0 }, // insert면 이 친구를 넘겨준다.
      ];

    case "DELETE": // 삭제... 액션 타입이 DELETE 이면
      return todos.filter((todo) => todo.id !== action.id); // 조건을 만족하면.. 아이디가 같지 않으면

    // 수정
    case "UPDATE":
      return todos.map((todo) =>
        todo.id === action.id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      );

    default: //목록
      return todos; // insert가 아니면 목록을 넘겨준다.
  }
};
