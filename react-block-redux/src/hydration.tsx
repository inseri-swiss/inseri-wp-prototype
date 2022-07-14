import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SmartComponent } from "./MyComponent";
import domReady from "@wordpress/dom-ready";

function initReactComponents() {
	const store = (window as any).inseri.store;
	const items = document.querySelectorAll(".wp-block-create-block-react-block");
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
