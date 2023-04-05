import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminHome from "./pages/Admin/AdminHome";
import Login from "./pages/Login";
import Account from "./pages/User/Account";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
