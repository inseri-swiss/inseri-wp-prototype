import ReactDOM from "react-dom";
import { SmartComponent } from "./MyComponent";
import domReady from "@wordpress/dom-ready";

function initReactComponents() {
	const items = document.querySelectorAll(".wp-block-create-block-react-block");
	if (items) {
		Array.from(items).forEach((item) => {
			const attributes = JSON.parse(item.dataset.attributes);
			ReactDOM.render(<SmartComponent attributes={attributes} />, item);
		});
	}
}

domReady(initReactComponents);
