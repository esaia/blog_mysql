import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContectProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContectProvider>
      <App />
    </AuthContectProvider>
  </React.StrictMode>
);
