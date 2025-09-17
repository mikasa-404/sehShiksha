import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import Dashboard from "./scenes/dashboard";
import { Box, createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import CommunityForum from "scenes/communityForum";
import QuestionPage from "scenes/questionPage";
import Navbar from "scenes/navbar";
import { useMediaQuery } from "@mui/material";
import UserWidget from "components/UserWidget";
import SideWidget from "components/SideWidget";
import ResourceHub from "scenes/resouceHub";

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isAuth && <Navbar />}
          <Box
            display="flex"
            flexDirection={isNonMobileScreens ? "row" : "column"}
            justifyContent={"center"}
            gap={"1.5rem"}
            width="100%"
            padding={isNonMobileScreens ? "0" : "2rem"}
          >
            {/* Conditionally render UserWidget and SideWidget based on route and screen size */}
            {/* {isAuth && (
              <Box
                width={isNonMobileScreens ? "20%" : "100%"}
                ml={isNonMobileScreens ? "6rem" : "0"}
              >
                <UserWidget />
              </Box>
            )} */}

            <Box
              width={isNonMobileScreens ? (isAuth ? "50%" : "100%") : "100%"}
            >
              <Routes>
                {/* Redirect to /home if authenticated */}
                <Route
                  path="/"
                  element={isAuth ? <Navigate to="/home" /> : <LoginPage />}
                />
                <Route
                  path="/home"
                  element={isAuth ? <Dashboard /> : <Navigate to="/" />}
                />
                <Route
                  path="/forum"
                  element={isAuth ? <CommunityForum /> : <Navigate to="/" />}
                />
                <Route
                  path="/forum/:quesId"
                  element={isAuth ? <QuestionPage /> : <Navigate to="/" />}
                />
                <Route
                  path="/resources"
                  element={isAuth ? <ResourceHub /> : <Navigate to="/" />}
                />
              </Routes>
            </Box>

            {isAuth && (
              <Box
                display={isNonMobileScreens ? "block" : "none"}
                width="20%"
                mr="6rem"
              >
                <SideWidget />
              </Box>
            )}
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
