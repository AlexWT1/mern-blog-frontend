import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { commentsReducer } from './slices/comment';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comment: commentsReducer,
  },
});

export default store;
