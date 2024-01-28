import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchPostsByTag = createAsyncThunk('posts/fetchPostsByTag', async (name) => {
  const { data } = await axios.post(`/tags/${name}`);
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
  axios.delete(`/posts/${id}`),
);

const initialState = {
  loadin: false,
  posts: {
    items: [],
    popularPosts: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload.posts;
      state.posts.popularPosts = action.payload.popularPosts;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
    [fetchPostsByTag.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload.posts;
      state.posts.popularPosts = action.payload.popularPosts;
      state.posts.status = 'loaded';
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
  },
});

export const postsReducer = postSlice.reducer;
