import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import Dashboard from "./scenes/dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
