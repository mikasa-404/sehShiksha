import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    mode: "light",
    posts: [],
    questions: [],
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload.questions;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        else return post;
      });
      state.posts = updatedPosts;
    },
    deletePost: (state, action)=>{
      const updatedPosts= state.posts.filter((post)=>post._id!==action.payload.postId);
      state.posts=updatedPosts;
    }
  },
});

export const { setLogin, setLogout, setMode, setPosts, setQuestions, setPost,deletePost } =
  authSlice.actions;
export default authSlice.reducer;
