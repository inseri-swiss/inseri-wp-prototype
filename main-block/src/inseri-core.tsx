import domReady from "@wordpress/dom-ready";
import subscribe from "redux-subscribe-reselect";
import { addSlice, removeSlice, store, metaSlice } from "./store";
import { combineReducers } from "@reduxjs/toolkit";
class Inseri {
	store = store;
	addSlice = addSlice;
	removeSlice = removeSlice;

	reducers: any = { "inseri/meta": metaSlice.reducer };
	injectReducer(block: string, newReducer: any) {
		this.reducers = { ...this.reducers, [block]: newReducer };
		store.replaceReducer(combineReducers(this.reducers) as any);
	}
	removeReducer(block: string) {
		if (this.reducers[block]) {
			delete this.reducers[block];
			store.replaceReducer(combineReducers(this.reducers) as any);
		}
	}

	setupElements(htmlQuery: string, callback: (element: HTMLElement) => void) {
		const items = document.querySelectorAll<HTMLElement>(htmlQuery);
		if (items) {
			Array.from(items).forEach((item) => {
				callback(item);
			});
		}
	}

	connectElementsToStore(
		htmlQuery: string,
		selector: any,
		callback: (element: HTMLElement, stateValue: any) => void
	) {
		this.setupElements(htmlQuery, (item) => {
			subscribe(store, selector, (stateData) => {
				callback(item, stateData);
			});
		});
	}
}

domReady(() => {
	const inseri = new Inseri();

	// @ts-ignore
	window.inseri = inseri;

	const selectFoo: any = (state: any) =>
		state && state["inseri/foo"] && state["inseri/foo"]["foo"];

	const manipulateImg = (element: HTMLImageElement, stateValue: any) => {
		const attributeValue = element.dataset.foo;
		element.src = `https://picsum.photos/id/${stateValue}/200/300`;
	};

	const setupErrorHandling = (element: HTMLImageElement) => {
		element.addEventListener("error", () => {
			//TODO proper error handling like show placeholder
			alert("That image was not found.");
		});
	};

	inseri.connectElementsToStore("img[data-foo]", selectFoo, manipulateImg);
	inseri.setupElements("img[data-foo]", setupErrorHandling);
});
