import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Form from "./Form";
import heroImage from "../../Images/2345130-removebg-preview.png"

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box display={"flex"} justifyContent='center' alignItems="center" mt={'4rem'}>
      <Box
        width={isNonMobileScreens ? "40%" : "90%"}
        display="flex"
        justifyContent='center'
        alignItems="center"
      >
        <Form />
       
      </Box>
      {isNonMobileScreens && 
        <img
          width="30%"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={heroImage}
          alt=""
        />}
    </Box>
  );
};

export default LoginPage;
