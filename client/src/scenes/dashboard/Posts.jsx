import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/authSlice.js";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";



const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispatch=useDispatch();
  const getPosts = async () => {
    const res = await fetch("posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(()=>{
    getPosts();
  },[]);
  return posts.length == 0 ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
     <CircularProgress />
    </Box>
  ) : (
    <WidgetWrapper>
      {posts.map((post)=><Box>{post.description}</Box>)}
    </WidgetWrapper>);
}


export default Posts;
