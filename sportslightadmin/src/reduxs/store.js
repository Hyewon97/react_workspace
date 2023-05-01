import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import boardReducers from "./reducers/board_reducer";
import noticeReducers from "./reducers/notice_reducer";

const store = configureStore({
  reducer: {
    board: boardReducers, // board_reducer.js에 있는 애를 등록시킴
    notice: noticeReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // 코드 암호화를 위해 false 지정
});

export default store;
