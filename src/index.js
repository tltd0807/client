import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/authCtx";
import CartState from "./store/cart/CartState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartState>
    </AuthContextProvider>
  </React.StrictMode>
);
