import React from "react";
import ReactDOM from "react-dom/client";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { MantineProvider } from "@mantine/core";

import { Provider } from "react-redux";

import store from "./store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
