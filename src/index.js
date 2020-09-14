import React from "react";
import ReactDOM from "react-dom";
import LoginControl from "./components/LoginControl.js";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <div className="row">
    <LoginControl />
  </div>,
  document.getElementById("root")
);
