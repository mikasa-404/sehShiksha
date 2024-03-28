import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import Dashboard from "./scenes/dashboard";
import { createTheme } from "@mui/material";
import {themeSettings  } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import CommunityForum from "scenes/communityForum";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state)=>state.token));
  
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth? <Dashboard />: <Navigate to="/"/>} />
            <Route path="/forum" element={isAuth? <CommunityForum />: <Navigate to="/"/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
