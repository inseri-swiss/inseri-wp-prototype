import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SmartComponent } from "./MyComponent";
import counterReducer from "./counter";
import domReady from "@wordpress/dom-ready";

domReady(() => {
	const inseri = (window as any).inseri;
	inseri.injectReducer({ counter: counterReducer });

	initReactComponents();
});

function initReactComponents() {
	const store = (window as any).inseri.store;
	const items = document.querySelectorAll(
		".wp-block-create-block-react-block-redux-child"
	);
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
