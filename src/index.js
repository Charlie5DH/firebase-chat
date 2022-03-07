import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import { App } from "./components/index";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
