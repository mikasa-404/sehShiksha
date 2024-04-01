import { Box } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import UserWidget from "../../components/UserWidget";
import React from "react";
import Navbar from "scenes/navbar";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import { useMediaQuery } from "@mui/material";

const Dashboard = () => {
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
        marginX={isNonMobileScreens?"8rem":"0"}
        flexDirection={isNonMobileScreens?"row":"column"}
      >
        <UserWidget />
        <Box display="flex" flexDirection="column" width={isNonMobileScreens?"80%":"100%"} gap="1.5rem">
          <CreatePost />
          <Posts />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
