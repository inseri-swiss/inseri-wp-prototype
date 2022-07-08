import { SmartComponent } from "./MyComponent";
import domReady from "@wordpress/dom-ready";
import ReactDOM from "react-dom";

function initReactComponents() {
	const items = document.querySelectorAll(
		".wp-block-create-block-react-block-chart"
	);
	if (items) {
		Array.from(items).forEach((item) => {
			ReactDOM.render(<SmartComponent />, item);
		});
	}
}

domReady(initReactComponents);
