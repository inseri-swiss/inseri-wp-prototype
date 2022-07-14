import React from "react";
import ReactDOM from "react-dom";
import { SmartComponent } from "./MyComponent";
import domReady from "@wordpress/dom-ready";
import { Provider } from "react-redux";

function initReactComponents() {
	const store = (window as any).inseri.store;
	const items = document.querySelectorAll(".wp-block-inseri-main-block");
	if (items) {
		Array.from(items).forEach((item) => {
			const attributes = JSON.parse((item as any).dataset.attributes);
			ReactDOM.render(
				<Provider store={store}>
					<SmartComponent attributes={attributes} />
				</Provider>,
				item
			);
		});
	}
}

domReady(initReactComponents);
