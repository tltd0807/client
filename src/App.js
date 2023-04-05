import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminHome from "./pages/Admin/AdminHome";
import Login from "./pages/Login";
import Account from "./pages/User/Account";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/signup" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
