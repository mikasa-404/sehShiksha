import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/authSlice.js";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Post from "./Post";
import baseUrl from "config";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`${baseUrl}/posts`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        dispatch(setPosts({ posts: data }));
      } catch (error) {
        console.log("Can't fetch posts", error.message);
      }
    };

    if (!posts.length) { // Check if posts is empty or undefined
      getPosts(); // Fetch posts if they haven't been fetched yet
    }
  }, [dispatch, posts.length, token]); // Include dispatch, posts.length, and token in dependencies array

  if (!posts || !posts.length) { // Render loading spinner if posts are not yet available
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {posts.map((post) => {
        console.log(post);
        return(
        <Box key={post._id}> {/* Ensure each child in a list has a unique "key" prop */}
          <Post post={post} />
        </Box>
      )})}
    </>
  );
};

export default Posts;
