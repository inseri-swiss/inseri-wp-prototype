import domReady from "@wordpress/dom-ready";
import { addDataType, removeDataType, store } from "./store";

class Inseri {
	store = store;
	addDataType = addDataType;
	removeDataType = removeDataType;
}

domReady(() => {
	// @ts-ignore
	window.inseri = new Inseri();
});
