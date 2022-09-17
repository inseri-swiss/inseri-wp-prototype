import domReady from "@wordpress/dom-ready";
import App from "./App.svelte";

function initComponents() {
	const items = document.querySelectorAll(
		".wp-block-create-block-svelte-block"
	);
	if (items) {
		Array.from(items).forEach((item) => {
			const attributes = JSON.parse(item.dataset.attributes);
			item.innerHTML = "";
			const app = new App({
				target: item,
			});
		});
	}
}

domReady(initComponents);
