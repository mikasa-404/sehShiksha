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
    <Box>
      <Navbar />
      <Box
        display="flex"
        gap="1.5rem"
        sx={{
          padding: "1.5rem 1.5rem 0.75rem 1.5rem",
        }}
        marginX={isNonMobileScreens ? "8rem" : "0"}
        flexDirection={isNonMobileScreens ? "row" : "column"}
      >
        <UserWidget />
        <Box
          display="flex"
          flexDirection="column"
          width={isNonMobileScreens ? "80%" : "100%"}
          gap="1.5rem"
        >
          <MyQuestion />
          <Questions />
        </Box>
      </Box>
    </Box>
  );
};

export default CommunityForum;
