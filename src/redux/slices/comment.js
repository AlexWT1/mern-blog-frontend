import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/posts/comments/${postId}`, {
        postId,
        comment,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getPostComments = createAsyncThunk('comment/getPostComments', async (postId) => {
  try {
    const { data } = await axios.get(`/posts/comments/${postId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getLastComment = createAsyncThunk('comment/getLastComment', async () => {
  try {
    const { data } = await axios.get(`/comments`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  comments: [],
  lastComments: [],
  loading: false,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  redusers: {},
  extraReducers: {
    // Create comments
    [createComment.pending]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state) => {
      state.loading = false;
    },
    // Get comments
    [getPostComments.pending]: (state) => {
      state.loading = true;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getPostComments.rejected]: (state) => {
      state.loading = false;
    },

    // Get Last
    [getLastComment.pending]: (state) => {
      state.loading = true;
    },
    [getLastComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.lastComments = action.payload;
    },
    [getLastComment.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const commentsReducer = commentSlice.reducer;
