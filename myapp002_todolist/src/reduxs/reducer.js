let boardList = [
  { id: 1, todoname: "운동하기", completed: 0 },
  { id: 2, todoname: "SNS꾸미기", completed: 0 },
  { id: 3, todoname: "사진정리하기", completed: 0 },
];

// 사용할 데이터를 선언해줌(todos에, 사용할 액션을 타입에 담아서 넘겨준다.)
export const reducer = (todos = boardList, action) => {
  switch (action.type) {
    case "INSERT": // 추가
      return [
        { id: todos.length + 1, todoname: action.todoname, completed: 0 }, // insert면 이 친구를 넘겨준다.
      ];

    default: //목록
      return todos; // insert가 아니면 목록을 넘겨준다.
  }
};
