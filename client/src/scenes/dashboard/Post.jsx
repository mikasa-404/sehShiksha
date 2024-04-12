import { Typography, Box, Button, Menu, MenuItem, Select } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Post = ({ post }) => {
  const { userPicturePath, firstName, lastName, description, picturePath } =
    post;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              src={`/assets/${userPicturePath}`}
            />
            <Box>
              <Typography fontWeight="500">
                {firstName + " " + lastName}
              </Typography>
            </Box>
          </Box>

          <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
            <BsThreeDotsVertical />
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem>Delete Post</MenuItem>
            <MenuItem>Edit Post</MenuItem>
          </Menu>
        </Box>

        <Typography>{description}</Typography>
        {picturePath && (
          <Box width="100%" display="flex" alignItems="center">
            <img
              style={{ objectFit: "cover", borderRadius: "0.75rem" }}
              alt="post"
              width="100%"
              height="auto"
              src={`/assets/${picturePath}`}
            />
          </Box>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default Post;
