import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  footballTalkList: [],
  pv: { currentPage: 1 },
  footballTalkDetail: {},
  currentTalkNum: null, // 비디오 넘 값 초기화
};

// state 값, 그 값을 받아서 처리해줄 함수를 설정
const footballTalkSlice = createSlice({
  // 초기값 설정
  name: "footballTalk",
  initialState,

  reducers: {
    getFootballTalkList(state, action) {
      // 데이터를 action이 받음. action.payload로 받음
      console.log(action);
      state.footballTalkList = action.payload.data.aList;
      state.pv = action.payload.data.pv;
    },

    // 상세 페이지
    getFootballTalkDetail(state, action) {
      state.footballTalkDetail = action.payload.data;
    },

    // 비디오 num 넘기기
    setCurrentTalkNum(state, action) {
      state.currentTalkNum = action.payload;
    },
  },
});

export const footballTalkReducers = footballTalkSlice.actions;
export default footballTalkSlice.reducer;
