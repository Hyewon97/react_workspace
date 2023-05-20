import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  replyList: [],
};

const replySlice = createSlice({
  name: 'reply',
  initialState, //이름을 주고 초기값 설정(initialState)

  reducers: {
    getReplyList(state, action) {
      state.replyList = action.payload.data.replyList;
    },
  },
});

//이것을 사용해서 함수명 자동완성을 할 수 있다.
export const replyReducers = replySlice.actions;
export default replySlice.reducer;
