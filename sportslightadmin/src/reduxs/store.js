import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import noticeReducers from "./reducers/notice_reducer";
import memberzReducers from "./reducers/memberz_reducer";
import videoReducers from "./reducers/video_reducer";

const store = configureStore({
  reducer: {
    notice: noticeReducers,
    memberz: memberzReducers,
    video: videoReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // 코드 암호화를 위해 false 지정
});

export default store;
