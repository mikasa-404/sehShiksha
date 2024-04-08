import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Form from "./Form";
import heroImage from "../../Images/2345130-removebg-preview.png";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:600px)");

  return (
    <Box
      display={"flex"}
      alignItems="center"
      width="100%"
      justifyContent={isNonMobileScreens ? "flex-start" : "center"}
    >
      {isNonMobileScreens && (
        <Box
          width="50%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          backgroundColor={"primary.light"}
          height="100vh"
        >
          <img width="50%" src={heroImage} alt="" />
          <Typography
            fontSize="2rem"
            fontWeight="500"
            width="50%"
            align="center"
          >
            Seh
            <Typography
              as="span"
              color="primary.dark"
              fontSize="2rem"
              fontWeight="500"
            >
              Shiksha
            </Typography>
          </Typography>
          <Typography fontSize="1rem" width="70%" align="center" mb="3rem">
            Your Ultimate Student Community Portal for Sharing, Learning, and
            Collaboration!
          </Typography>
        </Box>
      )}
      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        backgroundColor={"white"}

      >
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;