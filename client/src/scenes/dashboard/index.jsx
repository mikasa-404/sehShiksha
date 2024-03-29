import { Box } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import UserWidget from "../../components/UserWidget";
import React from "react";
import Navbar from "scenes/navbar";
import Posts from "./Posts";
import CreatePost from "./CreatePost";

const Dashboard = () => {
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
          <CreatePost />
          <Posts />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
