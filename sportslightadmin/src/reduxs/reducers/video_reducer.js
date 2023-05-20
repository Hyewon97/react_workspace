import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  videoList: [],
  pv: { currentPage: 1 },
  videoDetail: {},
  currentVideoNum: null, // 비디오 넘값 받기 위해.. 공사중
};

// state 값, 그 값을 받아서 처리해줄 함수를 설정한다.
const videoSlice = createSlice({
  // 초기값 설정
  name: "video",
  initialState,

  reducers: {
    getVideoList(state, action) {
      console.log(action);
      state.videoList = action.payload.data.aList;
      state.pv = action.payload.data.pv;
    },

    // 상세 페이지
    getVideoDetail(state, action) {
      state.videoDetail = action.payload.data;
    },

    // 비디오 num 넘기기
    setCurrentVideoNum(state, action) {
      state.currentVideoNum = action.payload;
    },
  },
});

export const videoReducers = videoSlice.actions;
export default videoSlice.reducer;
