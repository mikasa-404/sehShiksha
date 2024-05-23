import React, { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import baseUrl from "config";
import { styled } from "@mui/system";

const StyledLink = styled(Link)(({ theme, isSelected }) => ({
  textDecoration: "none",
  color: "inherit",
  transform: "scale(1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "& .MuiTypography-root": {
    fontWeight: isSelected ? "600" : "400",
  },
}));

const UserWidget = () => {
  const { firstName, lastName, email, picturePath, department } = useSelector(
    (state) => state.user
  );
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const location = useLocation();

  return (
    <WidgetWrapper height="fit-content">
      <Box display="flex" flexDirection="column" gap="1.2rem" alignItems="center">
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
          <StyledLink to="/home" isSelected={location.pathname === "/home"}>
            <Typography
              variant="h4"
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              fontSize="1.2em"
            >
              Home
            </Typography>
          </StyledLink>
          <StyledLink to="/resources" isSelected={location.pathname === "/resources"}>
            <Typography
              variant="h4"
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              fontSize="1.2em"
            >
              Resource Hub
            </Typography>
          </StyledLink>
          <StyledLink to="/forum" isSelected={location.pathname === "/forum"}>
            <Typography
              variant="h4"
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              fontSize="1.2em"
            >
              Community Forum
            </Typography>
          </StyledLink>
          <StyledLink to="/contact" isSelected={location.pathname === "/contact"}>
            <Typography
              variant="h4"
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              fontSize="1.2em"
            >
              Contact Us
            </Typography>
          </StyledLink>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
