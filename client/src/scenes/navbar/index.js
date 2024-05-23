import { useTheme } from "@emotion/react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "state/authSlice";
import { SiStudyverse } from "react-icons/si";


const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

  const alt = theme.palette.background.alt;
  return (
    <Box
      padding={isNonMobileScreens?"0.5rem 8rem":"0.5rem 2rem"}
      backgroundColor={alt}
      display="flex"
      mb="1.5rem"
      justifyContent="space-between"
      sx={{
        boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.1)"
  
      }}
    
    >
      {/* <Typography fontSize='2em' fontWeight='400'>Seh<span>Shiksha</span></Typography> */}
      <Typography fontSize="1.5rem" fontWeight="500" alignItems="center" display="flex" gap="0.5rem">
        <SiStudyverse size={30}/> SehShiksha
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
        </Button>
        <Button variant="contained" onClick={() => dispatch(setLogout())}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
