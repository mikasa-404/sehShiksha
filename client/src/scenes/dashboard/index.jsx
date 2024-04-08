import { Box, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import UserWidget from "../../components/UserWidget";
import React from "react";
import Navbar from "scenes/navbar";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const user= useSelector((state)=>state.user)

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
      </Box>
    </Box>
  );
};

export default Dashboard;
