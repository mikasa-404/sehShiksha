import {
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import baseUrl from "config";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost, setPosts } from "state/authSlice";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

const Post = ({ post }) => {
  const {
    userPicturePath,
    firstName,
    lastName,
    description,
    picturePath,
    likes,
    _id,
    userId,
  } = post;
  const loggedInUserId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const patchLike = async () => {
    const res = await fetch(`${baseUrl}/posts/${_id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      const deletedPostId = _id; // Assuming you have the _id of the post being deleted
      dispatch(deletePost({ postId: deletedPostId }));
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };
  //current user has liked or not
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  return (
    <WidgetWrapper>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        gap="1rem"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap="0.5rem" alignItems="center">
            <img
              style={{ objectFit: "cover", borderRadius: "50%" }}
              width={"30px"}
              height={"30px"}
              alt="user"
              src={`${baseUrl}/assets/${userPicturePath}`}
            />
            <Box>
              <Typography fontWeight="500">
                {firstName + " " + lastName}
              </Typography>
            </Box>
          </Box>
          {loggedInUserId === userId && (
            <>
              <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
                <BsThreeDotsVertical />
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
                <MenuItem>Edit Post</MenuItem>
              </Menu>
            </>
          )}
        </Box>

        <Typography>{description}</Typography>
        {picturePath && (
          <Box width="100%" display="flex" alignItems="center">
            <img
              style={{ objectFit: "cover", borderRadius: "0.75rem" }}
              alt="post"
              width="100%"
              height="auto"
              src={`${baseUrl}/assets/${picturePath}`}
            />
          </Box>
        )}
        <Box width="100%" display="flex" gap="5px" alignItems="center">
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <>
                <FcLike size={16} />
              </>
            ) : (
              <>
                <FcLikePlaceholder size={16} />
              </>
            )}
          </IconButton>
          <Typography color="primary.main" fontWeight="500">
            {likeCount}
          </Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default Post;
