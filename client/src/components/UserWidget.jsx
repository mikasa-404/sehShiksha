import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserWidget = () => {
  const { firstName, lastName, email, picturePath, department } = useSelector(
    (state) => state.user
  );
  return (
    <WidgetWrapper width="25%">
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
            src={`/assets/${picturePath}`}
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
            >
              {department}
            </Box>
            <Box fontSize={"small"}>{email}</Box>
          </Box>
        </Box>
        <Box
          width="100%"
          textAlign="left"
          fontWeight="400"
          color="neutral.dark"
          px={2}
          display="flex"
          flexDirection="column"
          gap="0.5rem"
        >
          <Link to="/home">
            <Typography
              variant="h4"
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              fontWeight={"500"}
              color="primary.main"
            >
              Home
            </Typography>
          </Link>
          <Link to="/resources">
            <Typography
              borderBottom="2px solid"
              borderColor={"primary.dark"}
              variant="h4"
            >
              Resource Hub
            </Typography>
          </Link>
          <Link to="/forum">
            <Typography variant="h4">Commuity Forum</Typography>
          </Link>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
