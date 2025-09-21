import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    lastFetched: null,
  },
  reducers:{
    setPosts: (state, action) => {
      // Ensure we have a valid array to set
      if (Array.isArray(action.payload.posts)) {
        state.posts = action.payload.posts;
        state.lastFetched = Date.now(); // Track when posts were last fetched
      } else {
        state.posts = [];
        state.lastFetched = Date.now();
      }
    },
    setPost: (state, action) => {
      if (!Array.isArray(state.posts)) {
        state.posts = [];
        return;
      }
      
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        else return post;
      });
      state.posts = updatedPosts;
    },
    deletePost: (state, action) => {
      if (!Array.isArray(state.posts)) {
        state.posts = [];
        return;
      }
      
      const updatedPosts = state.posts.filter((post) => post._id !== action.payload.postId);
      state.posts = updatedPosts;
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(REHYDRATE, (state, action) => {
  //     // Handle rehydration from redux-persist
  //     if (action.payload && action.payload.posts) {
  //       // Ensure the rehydrated posts is an array
  //       if (Array.isArray(action.payload.posts.posts)) {
  //         state.posts = action.payload.posts.posts;
  //         state.lastFetched = action.payload.posts.lastFetched || null;
  //       } else {
  //         console.warn("Rehydrated posts is not an array, using empty array");
  //         state.posts = [];
  //         state.lastFetched = null;
  //       }
  //     } else {
  //       // If no persisted posts, start with empty array
  //       state.posts = [];
  //       state.lastFetched = null;
  //     }
  //   });
  // }
});

export const { setPosts, setPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;