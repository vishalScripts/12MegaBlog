import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    deletePosts: (state) => {
      state.allPosts = []; // Clear allPosts array
    },
  },
});

export const { setPosts, deletePosts, addUserPosts } = postsSlice.actions;

export default postsSlice.reducer;
