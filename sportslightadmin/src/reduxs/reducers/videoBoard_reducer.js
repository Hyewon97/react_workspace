import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  videoBoardList: [],
  pv: { currentPage: 1 },
  videoBoardDetail: {},
};

// state 값, 그 값을 받아서 처리해줄 함수를 설정한다.
const videoBoardSlice = createSlice({
  // 초기값 설정
  name: "videoBoard",
  initialState,

  reducers: {
    getVideoBoardList(state, action) {
      console.log(action);
      state.videoBoardList = action.payload.data.aList;
      state.pv = action.payload.data.pv;
    },
  },
});

export const videoBoardReducers = videoBoardSlice.actions;
export default videoBoardSlice.reducer;
