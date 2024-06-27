import {
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import baseUrl from "config";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost, setPosts } from "state/authSlice";
import {
  BiDownvote,
  BiSolidUpvote,
  BiUpvote,
  BiSolidDownvote,
} from "react-icons/bi";

const Post = ({ post }) => {
  const {
    userPicturePath,
    firstName,
    lastName,
    description: originalDescription,
    picturePath,
    likes,
    downvotes,
    _id,
    userId,
  } = post;
  const loggedInUserId = useSelector((state) => state.user._id);
  console.log(downvotes);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [updatedDescription, setUpdatedDescription] =
    useState(originalDescription);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleClose(); // Close menu when dialog opens
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEdit = () => {
    setEditingDescription(true);
  };

  const handleCancelEdit = () => {
    setEditingDescription(false);
    setUpdatedDescription(originalDescription); // Reset to original description
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts/${_id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: updatedDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setEditingDescription(false);
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
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

      const deletedPostId = _id;
      dispatch(deletePost({ postId: deletedPostId }));
      handleCloseDialog(); // Close dialog after successful deletion
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
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
  const downVote = async () => {
    const res = await fetch(`${baseUrl}/posts/${_id}/down`, {
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

  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const isDownVoted = Boolean(downvotes[loggedInUserId]);
  // console.log(downVotes);
  const downCount = Object.keys(downvotes).length;

  return (
    <WidgetWrapper>
      <Box display="flex" flexDirection="column" gap="1rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" gap="0.5rem">
            <Avatar
              alt="User Avatar"
              src={`${baseUrl}/assets/${userPicturePath}`}
            />
            <Typography variant="subtitle1" fontWeight="bold">
              {`${firstName} ${lastName}`}
            </Typography>
          </Box>
          {loggedInUserId === userId && (
            <>
              <IconButton onClick={handleClick}>
                <BsThreeDotsVertical />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleOpenDialog}>Delete Post</MenuItem>
                <MenuItem onClick={handleEdit}>Edit Post</MenuItem>
              </Menu>
            </>
          )}
        </Box>
        {editingDescription ? (
          <Box display="flex" flexDirection="column" width="100%" gap="1rem">
            <TextField
              multiline
              rows={2}
              variant="outlined"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <Box display="flex" gap="10px">
              <Button onClick={handleCancelEdit}>Cancel</Button>
              <Button
                onClick={handleSaveEdit}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">{originalDescription}</Typography>
        )}
        {/* <Typography variant="body1">{description}</Typography> */}
        {picturePath && (
          <Box width="100%" display="flex" justifyContent="center">
            <img
              style={{
                objectFit: "cover",
                borderRadius: "0.75rem",
                maxWidth: "100%",
              }}
              alt="post"
              src={`${baseUrl}/assets/${picturePath}`}
            />
          </Box>
        )}
        <Box display="flex">
          <Box display="flex" alignItems="center" gap="5px">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <BiSolidUpvote size={16} color="green" />
              ) : (
                <BiUpvote size={16} />
              )}
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              {likeCount}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="5px">
            <IconButton onClick={downVote}>
              {isDownVoted ? (
                <BiSolidDownvote size={16} color="red" />
              ) : (
                <BiDownvote size={16} />
              )}
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              {downCount}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default Post;
