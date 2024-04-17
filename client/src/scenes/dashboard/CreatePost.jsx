import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useMediaQuery,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { setPosts } from "state/authSlice.js";
import Dropzone from "react-dropzone";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { GrGallery } from "react-icons/gr";
// import { Picker } from "emoji-mart";

const CreatePost = () => {
  //we need to send userid, post description and image

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [isImage, setIsImage] = useState(false); //iamge icon cicked
  const [image, setImage] = useState(null);
  const [des, setDes] = useState(""); //POST DESCRIPTION
  // const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const dispatch = useDispatch();
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", des);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const res = await fetch("posts", {
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

  return (
    <WidgetWrapper>
      <Box display="flex" flexDirection="column" gap="0.5rem">
        <TextField
          placeholder="What's on your mind..."
          onChange={(e) => setDes(e.target.value)}
          multiline
          rows={3}
          variant="standard"
          value={des}
          sx={{
            width: "100%",
            borderRadius: "2rem",
          }}
        />
        {isImage && (
          <Box border={`1px solid `} borderRadius="5px" p="1rem" sx={{
            cursor:"pointer"
          }}>
            <Dropzone
              onDrop={(acceptedFiles) => {
                setImage(acceptedFiles[0]);
              }}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <Box>
                  <Box>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!image ? (
                        <>
                          <Typography>Add picture here!</Typography>
                        </>
                      ) : (
                        <Box display="flex" justifyContent="space-between">
                          <Typography>{image.name}</Typography>
                          <Typography>
                            <EditOutlined />
                          </Typography>
                        </Box>
                      )}
                    </div>
                  </Box>
                  {image && (
                    <Button
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </Button>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="primary.main"
        >
          <Box display="flex" alignItems="center" gap="0.5rem">
            <Button onClick={() => setIsImage(!isImage)}>
              <GrGallery />
            </Button>
          </Box>
          <Button disabled={!des} onClick={handlePost} variant="contained">
            POST
          </Button>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default CreatePost;
