import { Box } from "@mui/material";
import React from "react";
import UserWidget from "components/UserWidget";
import Navbar from "scenes/navbar";
import MyQuestion from "./MyQuestion";

const CommunityForum = () => {
  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        gap="1.5rem"
        sx={{
          padding: "1.5rem 1.5rem 0.75rem 1.5rem",
        }}
        marginX="8rem"
      >
        <UserWidget />
        <Box display="flex" flexDirection="column" width="80%" gap="1.5rem">
          <MyQuestion/>
        </Box>
      </Box>
    </Box>
  );
};

export default CommunityForum;
