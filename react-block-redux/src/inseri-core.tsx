import domReady from "@wordpress/dom-ready";
import { store } from "./store";
import { combineReducers } from "@reduxjs/toolkit";

class Inseri {
	reducers: any = {};
	store = store;

	injectReducer(newReducer: any) {
		this.reducers = { ...this.reducers, ...newReducer };
		store.replaceReducer(combineReducers(this.reducers));
	}
}

domReady(() => {
	// @ts-ignore
	window.inseri = new Inseri();
});
