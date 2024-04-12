import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

const SideWidget = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

  return (
    <WidgetWrapper
      height="fit-content"
    >
      <Typography fontSize="1rem" fontWeight="500"> Upcoming features:</Typography>
      <List>
        <ListItem>
          <ListItemText> AI support for writing posts and threads</ListItemText>
        </ListItem>
        <ListItem> 
        <ListItemText> Emoji picker</ListItemText> </ListItem>
      </List>
    </WidgetWrapper>
  );
};

export default SideWidget;
