import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

// Render the app using the new createRoot API
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
