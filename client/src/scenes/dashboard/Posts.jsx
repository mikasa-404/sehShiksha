
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/postsSlice";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Post from "./Post";
import baseUrl from "config";

const Posts = () => {
  const posts = useSelector((state) => state.posts?.posts || []);
  const token = useSelector((state) => state.auth.token);
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

    getPosts();
  }, [token, dispatch]); 

  if (!Array.isArray(posts) || posts.length === 0) {
    // Render loading spinner if posts are not yet available
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {posts.map((post) => {
        return (
          <Box key={post._id}>
            {" "}
            {/* Ensure each child in a list has a unique "key" prop */}
            <Post post={post} />
          </Box>
        );
      })}
    </>
  );
};

export default Posts;

