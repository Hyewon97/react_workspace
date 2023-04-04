// 리덕스 툴킷을 이용해서 작업을 한다.
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  boardList: [], // boardList로 DB에 있는 값을 긁어온다
  pv: { currentPage: 1 },
  boardDetail: {},
  boardFile: null,
};

// state 값, 그 값을 받아서 처리해줄 함수를 설정한다.
const boardSlice = createSlice({
  // 초기값 설정
  name: "board",
  initialState,

  reducers: {
    //
    // DB에서 받아온 결과값을 action에 넘겨준다. action 인자값은 2개지만 선언할 때 한번만 선언을 한다. reducer 등록할 때 설정해주면 됨.
    // ...state 했던거를 안해줘도 된다.
    getBoardList(state, action) {
      // 데이터를 action이 받음. action.payload로 받음
      console.log(action);
      state.boardList = action.payload.data.aList;

      // 스프링 부트 보드 컨트롤에서 pv로 보드 리스트를 보내기 때문에 위는 정보(aList), 아래는 페이지 정보(pv)를 담는다.

      state.pv = action.payload.data.pv;
    },
  },
});

// 상품에 관한 슬라이드를 구현할 때 위에 코드를 복사해서 수정해서 사용 가능하다.
// 여러개 사용 가능하다.

// 이것을 이용해서 함수명 자동완성을 할 수 있다.
//
// action에서 getBoardList를 호출해서 값을 넘겨줘야 함.
//이걸 선언을 안해면  boardSlice.actions.getBoardList.. 이런식으로 사용해야 함.
export const boardReducers = boardSlice.actions;
export default boardSlice.reducer; // getBoardList을 웹에서 사용할 수 있도록 하는 코드
