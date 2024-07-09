import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";

import { injectGlobal } from "emotion";

injectGlobal({
  html: {
    height: "100%",
    width: "100%"
  },
  body: {
    height: "100%",
    width: "100%",
    background: "#E3E8EE"
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>
);
