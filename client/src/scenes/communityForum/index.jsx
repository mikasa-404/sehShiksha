import { Box } from "@mui/material";
import React from "react";
import UserWidget from "components/UserWidget";
import Navbar from "scenes/navbar";
import MyQuestion from "./MyQuestion";
import Questions from "./Questions";
import { useMediaQuery } from "@mui/material";

const CommunityForum = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box display="flex" flexDirection="column" gap="1.5rem" width="100%">
      <MyQuestion />
      <Questions />
    </Box>
  );
};

export default CommunityForum;
