import React from "react";
import ReactDOM from "react-dom";
import seed from "./seed";
import "./index.css";
import Form from './components/Form';

ReactDOM.render(<Form seed={seed} />, document.querySelector("#root"));
