import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminHome from "./pages/Admin/AdminHome";
import Login from "./pages/Login";
import Account from "./pages/User/Account";
import SignUpPage from "./pages/SignUpPage";
import ForgotPage from "./pages/ForgotPage";
import ResetPage from "./pages/ResetPage";
import Address from "./pages/User/Address";
import AuthContext from "./store/authCtx";

import "./App.css";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {authCtx.isLoggedIn && <Route path="/account" element={<Account />} />}
        {authCtx.isLoggedIn && (
          <Route path="/account/address" element={<Address />} />
        )}
        {authCtx.isLoggedIn && <Route path="/admin" element={<AdminHome />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPage />} />
        <Route path="/resetPassword/:resetToken" element={<ResetPage />} />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
