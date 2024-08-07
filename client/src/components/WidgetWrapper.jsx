import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
  boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.1)",
  width:"100%"
}));

export default WidgetWrapper;