import videoReducers from './reducers/videoReducers';
import talkReducers from './reducers/talkReducer';
import replyReducer from './reducers/replyReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    video: videoReducers,
    talk: talkReducers,
    reply: replyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
