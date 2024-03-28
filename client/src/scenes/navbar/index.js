import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "state/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const alt = theme.palette.background.alt;
  return (
    <Box
      padding="1rem 6%"
      backgroundColor={alt}
      display="flex"
      justifyContent="space-between"
    >
      <Typography fontSize='2em' fontWeight='400'>Seh<span>Shiksha</span></Typography>
      <Button variant="contained" onClick={() => dispatch(setMode())}>
        Change Mode
      </Button>
      <Button variant="contained" onClick={() => dispatch(setLogout())}>
        Logout
      </Button>
    </Box>
  );
};

export default Navbar;
