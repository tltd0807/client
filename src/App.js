import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminHome from "./pages/Admin/AdminHome";
import Login from "./pages/Login";
import Account from "./pages/User/Account";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPage from "./pages/ForgotPage";
import ResetPage from "./pages/ResetPage";
import Address from "./pages/User/Address";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/address" element={<Address />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPage />} />
        <Route path="/resetPassword/:resetToken" element={<ResetPage />} />
      </Routes>
    </div>
  );
}

export default App;
