import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  footballTalkReplyList: [],
  pv: { currentPage: 1 },
  footballTalkReplyDetail: {},
};

const footballTalkReplySlice = createSlice({
  // 초기값 설정
  name: "footballTalkReply",
  initialState,

  reducers: {
    getFootballTalkReplyList(state, action) {
      // 데이터를 action이 받음. action.payload로 받음
      console.log(action);
      state.footballTalkReplyList = action.payload.data.aList;
      state.pv = action.payload.data.pv;
    },
  },
});

export const footballTalkReplyReducers = footballTalkReplySlice.actions;
export default footballTalkReplySlice.reducer;
