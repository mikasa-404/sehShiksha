import { useTheme } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setMode } from 'state/authSlice';

const Navbar = () => {
    const dispatch=useDispatch();
    const theme = useTheme();

  const alt = theme.palette.background.alt;
  return (
    <Box padding="1rem 6%" backgroundColor={alt}
        >
        <Button variant='contained' onClick={() => dispatch(setMode())}>
            Change Mode
      </Button>
    </Box>
  )
}

export default Navbar