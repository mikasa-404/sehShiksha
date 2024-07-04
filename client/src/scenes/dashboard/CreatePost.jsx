import WidgetWrapper from "components/WidgetWrapper";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import { setPosts } from "state/authSlice.js";
import Dropzone from "react-dropzone";
import {
  DeleteOutlined,
  EditOutlined,
  EmojiEmotionsOutlined,
  PhotoCamera,
} from "@mui/icons-material";
import { GrGallery } from "react-icons/gr";
import Picker from "emoji-picker-react";
import baseUrl from "config";

const CreatePost = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [des, setDes] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const emojiPickerRef = useRef(null);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", des);
    if (image) {
      formData.append("picturePath", image.name);
    }
    const res = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json();
      console.log("error", errData);
    }
    const posts = await res.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setDes("");
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!validImageTypes.includes(file.type)) {
      alert("Please upload a valid image file (jpeg, png, gif).");
      return;
    }

    if (file.size > 5000000) {
      // 5MB size limit
      alert("File is too large. Please upload a file smaller than 5MB.");
      return;
    }

    setImage(file);
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <WidgetWrapper>
      <Typography fontSize="1rem" fontWeight="500" mb="1rem">
        Create a Post
      </Typography>
      <Box display="flex" gap="1rem" alignItems="center">
        <Avatar alt="User Avatar" src={`${baseUrl}/assets/${picturePath}`} />
        <TextField
          placeholder="What's on your mind..."
          onChange={(e) => setDes(e.target.value)}
          multiline
          rows={3}
          variant="outlined"
          value={des}
          sx={{
            width: "100%",
            borderRadius: "8px",
          }}
        />
      </Box>
      {isImage && (
        <Box
          border={`2px dashed #3f51b5`}
          borderRadius="8px"
          p="1rem"
          sx={{
            cursor: "pointer",
            textAlign: "center",
            transition: "background-color 0.3s ease",
            backgroundColor: "backgroundColor.alt",
            "&:hover": {
              backgroundColor: "neutral.light",
            },
          }}
          mt="1rem"
        >
          <Dropzone onDrop={handleDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input {...getInputProps()} type="file" accept="image/*" />
                {!image ? (
                  <>
                    <PhotoCamera sx={{ fontSize: "2rem", color: "#3f51b5" }} />
                    <Typography variant="body2" color="gray">
                      Drag & drop an image here, or click to select one
                    </Typography>
                  </>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography>{image.name}</Typography>
                    <EditOutlined />
                  </Box>
                )}
              </Box>
            )}
          </Dropzone>
          {image && (
            <Button
              onClick={() => setImage(null)}
              sx={{ width: "100%", mt: 1 }}
              variant="outlined"
              color="secondary"
              startIcon={<DeleteOutlined />}
            >
              Remove Image
            </Button>
          )}
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        color="primary.main"
        mt="1rem"
      >
        <Box display="flex" alignItems="center" gap="0.5rem">
          <Tooltip title="Add Image">
            <IconButton onClick={() => setIsImage(!isImage)}>
              <GrGallery />
            </IconButton>
          </Tooltip>
          <Box sx={{ position: "relative" }}>
            <Tooltip title="Add Emoji">
              <IconButton onClick={() => setShowEmojiPicker(true)}>
                <EmojiEmotionsOutlined />
              </IconButton>
            </Tooltip>
            {showEmojiPicker && (
              <Box ref={emojiPickerRef} position="absolute" zIndex="tooltip">
                <Picker
                  onEmojiClick={(e) => {
                    setDes((des) => des + e.emoji);
                    setShowEmojiPicker(false);
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
        <Button
          disabled={!des}
          onClick={handlePost}
          variant="contained"
          color="primary"
        >
          POST
        </Button>
      </Box>
    </WidgetWrapper>
  );
};

export default CreatePost;
