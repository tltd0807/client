import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/authCtx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CartState from "./store/cart/CartState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        "client-id":
          "AWUVfuukuzE9u90DLsffz5ggwAIz_9LSY9F51PbAOMld1mUQGa27RYzSHFoEbFYb69nY2Wfv4l6JrE7I",
      }}
    >
      <AuthContextProvider>
        <CartState>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartState>
      </AuthContextProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
