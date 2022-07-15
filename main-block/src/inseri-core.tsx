import domReady from "@wordpress/dom-ready";
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
}

domReady(() => {
	// @ts-ignore
	window.inseri = new Inseri();
});
