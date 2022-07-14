import React, { ComponentType, useEffect } from "react";
import { Provider } from "react-redux";
import type { Reducer } from "@reduxjs/toolkit";
import type { MetaItem } from "./store";

interface ReducerMap {
	name: string;
	reducer: Reducer;
}

export const withInseri =
	(Component: ComponentType, reducerMap?: ReducerMap, metaItems?: MetaItem[]) =>
	({ ...props }) => {
		const inseri = (window as any).inseri;

		useEffect(() => {
			if (reducerMap) {
				const { name, reducer } = reducerMap;
				inseri.injectReducer({ [name]: reducer });
			}

			if (reducerMap && metaItems) {
				const dispatch = inseri.store.dispatch;
				const addDataType = inseri.addDataType;

				metaItems.forEach((i) => {
					dispatch(addDataType(i));
				});
			}
		}, []);

		return (
			<Provider store={inseri?.store}>
				<Component {...props} />
			</Provider>
		);
	};
