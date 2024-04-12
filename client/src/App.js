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

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Box
            display="flex"
            mx={isNonMobileScreens? "6rem":"0"}
            sx={{
              padding: "1.5rem 1.5rem 0.75rem 1.5rem",
            }}
            flexDirection={isNonMobileScreens ? "row" : "column"}
            justifyContent={"space-between"}
            gap={"1.5rem"}
          >
            <Box width={isNonMobileScreens ? "20%" : "100%"}>
              <UserWidget />
            </Box>

            <Box width={isNonMobileScreens ? "50%" : "100%"}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
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
              </Routes>
            </Box>
            <Box display={isNonMobileScreens ? "block" : "none"}>
              <SideWidget />
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
