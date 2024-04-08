import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "state/authSlice";
import { SiStudyverse } from "react-icons/si";


const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const alt = theme.palette.background.alt;
  return (
    <Box
      padding="0.5rem 8rem"
      backgroundColor={alt}
      display="flex"
      justifyContent="space-between"
      sx={{
        boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.1)"

      }}
      // alignItems="center"
      // position="fixed"
      // top="0"
      // left="0"
      // right="0"
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
