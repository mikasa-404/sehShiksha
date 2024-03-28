import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    mode: "light",
    posts: [],
    questions:[],
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
    setQuestions:(state, action)=>{
      state.questions=action.payload.questions;
    }
  },
});

export const { setLogin, setLogout, setMode, setPosts,setQuestions } = authSlice.actions;
export default authSlice.reducer;
