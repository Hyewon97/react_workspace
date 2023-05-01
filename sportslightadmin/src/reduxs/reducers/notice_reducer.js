// 리덕스 툴킷을 이용해서 작업을 한다.
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  noticeList: [], // boardList로 DB에 있는 값을 긁어온다
  pv: { currentPage: 1 },
  noticeDetail: {},
};

// state 값, 그 값을 받아서 처리해줄 함수를 설정한다.
const noticeSlice = createSlice({
  // 초기값 설정
  name: "notice",
  initialState,

  reducers: {
    //
    // DB에서 받아온 결과값을 action에 넘겨준다. action 인자값은 2개지만 선언할 때 한번만 선언을 한다. reducer 등록할 때 설정해주면 됨.
    // ...state 했던거를 안해줘도 된다.
    getNoticeList(state, action) {
      // 데이터를 action이 받음. action.payload로 받음
      console.log(action);
      state.noticeList = action.payload.data.aList;

      // 스프링 부트 보드 컨트롤에서 pv로 보드 리스트를 보내기 때문에 위는 정보(aList), 아래는 페이지 정보(pv)를 담는다.

      state.pv = action.payload.data.pv;
    },

    //action에서 사용할 때 boardReducers.getBoardDetail 이렇게 사용할 수 있음
    getNoticeDetail(state, action) {
      state.noticeDetail = action.payload.data;
    },

    // 첨부파일 다운로드
    // 꼭 store에 저장해서 넘기지 않아도 됨 component 하나에서만 사용되므로
    // getBoardDownload(state, action) {
    //   state.boardFile = action.payload.data;
    // },
  },
});

// 상품에 관한 슬라이드를 구현할 때 위에 코드를 복사해서 수정해서 사용 가능하다.
// 여러개 사용 가능하다.

// 이것을 이용해서 함수명 자동완성을 할 수 있다.
//
// action에서 getBoardList를 호출해서 값을 넘겨줘야 함.
//이걸 선언을 안해면  boardSlice.actions.getBoardList.. 이런식으로 사용해야 함.
export const noticeReducers = noticeSlice.actions;
export default noticeSlice.reducer; // getBoardList을 웹에서 사용할 수 있도록 하는 코드
