import { useTheme } from "@emotion/react";
import { useMediaQuery, InputAdornment } from "@mui/material";
import { DarkMode, LightMode, Logout, Notifications, Person, Search } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/authSlice";
import { SiStudyverse } from "react-icons/si";
import { useLocation } from "react-router-dom";
import baseUrl from "config";
import {
  NavbarContainer,
  LogoContainer,
  LogoText,
  NavigationLinks,
  NavLink,
  NavLinkText,
  ActiveIndicator,
  RightSection,
  SearchForm,
  SearchTextField,
  ThemeToggleButton,
  NotificationButton,
  NotificationBadge,
  UserMenuButton,
  UserAvatar,
  StyledMenu,
  MenuItemWithIcon
} from "./navbar.styles";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const location = useLocation();
  const { firstName, lastName, picturePath } = useSelector((state) => state.auth.user);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount, setNotificationCount] = useState(3); // Mock notification count - replace with actual logic
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    handleClose();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Add search functionality here
    console.log("Searching for:", searchQuery);
  };

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Resource Hub", path: "/resources" },
    { name: "Community Forum", path: "/forum" },
  ];

  return (
    <NavbarContainer isNonMobileScreens={isNonMobileScreens}>
      {/* Left side - Logo and Navigation Links */}
      <LogoContainer>
        <LogoText>
          <SiStudyverse size={30} /> SehShiksha
        </LogoText>
        
        {/* Navigation Links */}
        {isNonMobileScreens && (
          <NavigationLinks>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink key={link.name} to={link.path}>
                  <NavLinkText variant="h6" isActive={isActive}>
                    {link.name}
                  </NavLinkText>
                  {isActive && <ActiveIndicator />}
                </NavLink>
              );
            })}
          </NavigationLinks>
        )}
      </LogoContainer>

      {/* Right side - Search, Theme, Notifications, and User Menu */}
      <RightSection>
        {/* Search Bar */}
        {isNonMobileScreens && (
          <SearchForm component="form" onSubmit={handleSearchSubmit}>
            <SearchTextField
              size="small"
              placeholder="Search for posts, discussions, users"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "inherit", opacity: 0.7 }} />
                  </InputAdornment>
                ),
              }}
            />
          </SearchForm>
        )}

        {/* Theme Toggle */}
        <ThemeToggleButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
        </ThemeToggleButton>

        {/* Notifications with Badge */}
        <NotificationButton>
          <NotificationBadge 
            badgeContent={notificationCount > 0 ? notificationCount : null} 
            color="error"
          >
            <Notifications />
          </NotificationBadge>
        </NotificationButton>

        {/* User Menu */}
        <UserMenuButton onClick={handleClick}>
          <UserAvatar
            src={`${baseUrl}/assets/${picturePath}`}
            alt={`${firstName} ${lastName}`}
          />
        </UserMenuButton>

        <StyledMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItemWithIcon onClick={handleClose}>
            <Person fontSize="small" />
            Profile
          </MenuItemWithIcon>
          <MenuItemWithIcon onClick={handleLogout}>
            <Logout fontSize="small" />
            Logout
          </MenuItemWithIcon>
        </StyledMenu>
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;
