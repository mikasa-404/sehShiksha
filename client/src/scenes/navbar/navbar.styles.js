import { Box, Typography, IconButton, Badge, Avatar, Menu, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

// Main navbar container
export const NavbarContainer = styled(Box)(({ theme, isNonMobileScreens }) => ({
  padding: isNonMobileScreens ? "0.5rem 3rem" : "0.5rem 2rem",
  backgroundColor: theme.palette.background.alt,
  display: "flex",
  marginBottom: "1.5rem",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.1)",
}));

// Logo section
export const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
});

export const LogoText = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: "500",
  alignItems: "center",
  display: "flex",
  gap: "0.6rem",
});

// Navigation links
export const NavigationLinks = styled(Box)({
  display: "flex",
  gap: "1.5rem",
});

export const NavLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  position: "relative",
});

export const NavLinkText = styled(Typography)(({ theme, isActive }) => ({
  color: isActive ? theme.palette.primary.main : "inherit",
  fontWeight: isActive ? "600" : "400",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  transition: "color 0.3s ease",
}));

export const ActiveIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "-8px",
  left: 0,
  right: 0,
  height: "2px",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "1px",
}));

// Right section container
export const RightSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

// Search components
export const SearchForm = styled(Box)({
  // Form styles are handled by the component itself
});

export const SearchTextField = styled(TextField)(({ theme }) => ({
  minWidth: "250px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
    "& fieldset": {
      border: "1px solid",
      borderColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputBase-input": {
    color: "inherit",
    "&::placeholder": {
      color: "inherit",
      opacity: 0.7,
    },
  },
}));

// Action buttons
export const ThemeToggleButton = styled(IconButton)({
  color: "inherit",
});

export const NotificationButton = styled(IconButton)({
  color: "inherit",
});

export const NotificationBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    fontSize: "0.6rem",
    minWidth: "14px",
    height: "14px",
  },
});

// User menu components
export const UserMenuButton = styled(IconButton)({
  color: "inherit",
  padding: "4px",
});

export const UserAvatar = styled(Avatar)({
  width: 32,
  height: 32,
});

export const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    elevation: 0,
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    marginTop: "1.5rem",
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      marginLeft: "-0.5rem",
      marginRight: "1rem",
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      backgroundColor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
});

export const MenuItemWithIcon = styled(MenuItem)({
  "& .MuiSvgIcon-root": {
    marginRight: "1rem",
  },
});
