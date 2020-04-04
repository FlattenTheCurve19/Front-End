import React from "react";
import ReactDOM from "react-dom";
// import "animate.css/animate.min.css";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { store } from "./Store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
