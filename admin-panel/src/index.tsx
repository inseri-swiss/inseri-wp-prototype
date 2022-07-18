import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./MyComponent";
import domReady from "@wordpress/dom-ready";

function init() {
	const root = document.querySelector("#inseri-root");
	ReactDOM.render(<MyComponent />, root);
}

domReady(init);
