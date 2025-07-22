import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext"; // ✅ import it

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider> {/* ✅ wrap with ThemeProvider */}
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
