import { Box, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import UserWidget from "../../components/UserWidget";
import React from "react";
import Navbar from "scenes/navbar";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import SideWidget from "../../components/SideWidget";

const Dashboard = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const user = useSelector((state) => state.user);

  return (
    <Box display="flex" flexDirection="column" gap="1.5rem">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize="1rem" fontWeight="500">
          Hi {user.firstName}! 👋
        </Typography>
        <Typography color="primary.dark">
          From Updates to Opportunities: Discover it All on Our Communal
          Dashboard!
        </Typography>
      </Box>
      <CreatePost />
      <Posts />
    </Box>
  );
};

export default Dashboard;
