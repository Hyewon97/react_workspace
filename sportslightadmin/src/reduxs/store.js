import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import noticeReducers from "./reducers/notice_reducer";
import memberzReducers from "./reducers/memberz_reducer";
import videoReducers from "./reducers/video_reducer";
import videoBoardReducers from "./reducers/videoBoard_reducer";
import footballTalkReducers from "./reducers/footballTalk_reducer";
import footballTalkReplyReducers from "./reducers/footballTalkReply_reducer";

const store = configureStore({
  reducer: {
    notice: noticeReducers,
    memberz: memberzReducers,
    video: videoReducers,
    videoBoard: videoBoardReducers,
    footballTalk: footballTalkReducers,
    footballTalkReply: footballTalkReplyReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // 코드 암호화를 위해 false 지정
});

export default store;
