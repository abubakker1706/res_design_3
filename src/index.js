import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextTab from "./Context/ContextTab";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextTab>
      <App />
    </ContextTab>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
