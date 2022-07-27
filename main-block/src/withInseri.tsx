import React, { ComponentType, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import type { Reducer } from "@reduxjs/toolkit";
import { MetaItem } from "./store";

interface Opt {
	block: string;
	reducer: Reducer;
	metaItems: MetaItem[];
}

// TODO provide a helper function with built-in switch as follows:
const useMaybeSelector = (isSSR: boolean, callback: any) => {
	if (!isSSR) {
		return useSelector(callback);
	}
	return {};
};

const useMaybeDispatch = (isSSR: boolean) => {
	if (!isSSR) {
		return useDispatch();
	}
	return () => {};
};

export const withInseri =
	(Component: ComponentType, opt: Opt) =>
	({ ...props }) => {
		const inseri = (window as any).inseri;

		useEffect(() => {
			if (opt) {
				const { block, reducer, metaItems } = opt;

				const activeBlocks =
					inseri.store.getState()["inseri/meta"]["activeBlocks"][block];

				if (!activeBlocks || activeBlocks < 0) {
					inseri.injectReducer(block, reducer);
				}

				const dispatch = inseri.store.dispatch;
				const addSlice = inseri.addSlice;

				dispatch(addSlice({ block, fields: metaItems }));

				return () => {
					const activeBlocks =
						inseri.store.getState()["inseri/meta"]["activeBlocks"][block];
					if (activeBlocks === 1) {
						inseri.removeReducer(block);
					}

					const dispatch = inseri.store.dispatch;
					const removeSlice = inseri.removeSlice;

					dispatch(removeSlice(block));
				};
			}
		}, []);

		return (
			<Provider store={inseri?.store}>
				<Component {...props} />
			</Provider>
		);
	};
