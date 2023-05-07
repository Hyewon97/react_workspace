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
    // DB에서 받아온 값을 action에 넣어줌
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
  },
});

export const noticeReducers = noticeSlice.actions;
export default noticeSlice.reducer;
