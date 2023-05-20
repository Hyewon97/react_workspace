import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  recentList: [],
  viewsList: [],
  leagueList: [],
  talkpageDto: { currentPage: 1 },
  leagueNum: {},
  talkRead: {},
  fileName: null,
};

const talkSlice = createSlice({
  name: 'talk',
  initialState, //이름을 주고 초기값 설정(initialState)

  reducers: {
    recentList(state, action) {
      state.recentList = action.payload.data.recentList;
      state.talkpageDto = action.payload.data.talkpageDto;
    },

    viewsList(state, action) {
      state.viewsList = action.payload.data.viewsList;
      state.talkpageDto = action.payload.data.talkpageDto;
    },

    leagueList(state, action) {
      state.leagueList = action.payload.data.leagueList;
      state.leagueNum = action.payload.data.leagueNum;
    },

    talkRead(state, action) {
      state.talkRead = action.payload.data;
    },

    talkDownload(state, action) {
      state.fileName = action.payload.data;
    },
  },
});

//이것을 사용해서 함수명 자동완성을 할 수 있다.
export const talkReducers = talkSlice.actions;
export default talkSlice.reducer;
