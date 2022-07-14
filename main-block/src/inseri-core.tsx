import domReady from "@wordpress/dom-ready";
import { addDataType, removeDataType, store, metaSlice } from "./store";
import { combineReducers } from "@reduxjs/toolkit";
class Inseri {
	store = store;
	addDataType = addDataType;
	removeDataType = removeDataType;

	reducers: any = { "inseri/meta": metaSlice.reducer };
	injectReducer(newReducer: any) {
		this.reducers = { ...this.reducers, ...newReducer };
		store.replaceReducer(combineReducers(this.reducers) as any);
	}
}

domReady(() => {
	// @ts-ignore
	window.inseri = new Inseri();
});
