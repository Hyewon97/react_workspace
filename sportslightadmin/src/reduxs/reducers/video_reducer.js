import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  videoList: [],
  pv: { currentPage: 1 },
  videoDetail: {},
};

// state 값, 그 값을 받아서 처리해줄 함수를 설정한다.
const videoSlice = createSlice({
  // 초기값 설정
  name: "video",
  initialState,

  reducers: {
    getVideoList(state, action) {
      // 데이터를 action이 받음. action.payload로 받음
      console.log(action);
      state.videoList = action.payload.data.aList;
      state.pv = action.payload.data.pv;
    },

    // 상세 페이지
    getVideoDetail(state, action) {
      state.videoDetail = action.payload.data;
    },
  },
});

export const videoReducers = videoSlice.actions;
export default videoSlice.reducer;
