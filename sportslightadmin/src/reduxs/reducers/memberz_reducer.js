import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  memberzList: [],
  pv: { currentPage: 1 },
  memberzDetail: {},
};

// state 값, 그 값을 받아서 처리해줄 함수를 설정한다.
const memberzSlice = createSlice({
  // 초기값 설정
  name: "memberz",
  initialState,

  reducers: {
    getMemberzList(state, action) {
      // 데이터를 action이 받음. action.payload로 받음
      console.log(action);
      state.memberzList = action.payload.data.aList;
      state.pv = action.payload.data.pv;
    },
  },
});

export const memberzReducers = memberzSlice.actions;
export default memberzSlice.reducer;
