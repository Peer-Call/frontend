import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import globalStore from "./globalStore";
import "./style.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
);
