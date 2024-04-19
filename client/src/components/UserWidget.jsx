import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import baseUrl from "config";

const UserWidget = () => {
  const { firstName, lastName, email, picturePath, department } = useSelector(
    (state) => state.user
  );
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

  return (
    <WidgetWrapper
      height="fit-content"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="1.2rem"
        alignItems="center"
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          gap="1.2rem"
          alignItems="center"
          borderBottom="2px solid"
          borderColor={"primary.dark"}
          pb="1.2rem"
        >
          <img
            style={{ objectFit: "cover", borderRadius: "50%" }}
            width={"70px"}
            height={"70px"}
            alt="user"
            src={`${baseUrl}/assets/${picturePath}`}
          />
          <Box
            display="flex"
            flexDirection="column"
            gap="0.4rem"
            alignItems="center"
            color="neutral.main"
          >
            <Typography variant="h4" fontWeight="500" color="neutral.dark">
              {firstName + " " + lastName}
            </Typography>
            <Box
              backgroundColor="neutral.light"
              px={2}
              py={0.5}
              borderRadius={10}
              fontSize={"small"}
              textAlign="center"
            >
              {department}
            </Box>
            <Box fontSize={"small"} textAlign="center">
              {email}
            </Box>
          </Box>
        </Box>
        <Box
          width="100%"
          textAlign="left"
          fontWeight="400"
          px={2}
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          pb="1.2rem"
        >
          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h4"
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              fontWeight={"500"}
              fontSize="1.2em"
            >
              Home
            </Typography>
          </Link>
          <Link
            to="/resources"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h4"
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              fontSize="1.2em"
            >
              Resource Hub
            </Typography>
          </Link>
          <Link
            to="/forum"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h4"
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              fontSize="1.2em"
            >
              Community Forum
            </Typography>
          </Link>
          <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h4"
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              fontSize="1.2em"
            >
              Contact Us
            </Typography>
          </Link>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
