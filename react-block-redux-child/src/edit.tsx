import React, { useState, useEffect } from "react";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";
import { SmartComponent } from "./MyComponent";
import { Provider } from "react-redux";
import counterReducer from "./counter";

export default function Edit({ attributes, setAttributes }: any) {
	const [isReady, setReady] = useState(false);
	const inseri = (window as any).inseri;

	useEffect(() => {
		inseri.injectReducer({ counter: counterReducer });
		setReady(true);
	}, []);

	return isReady && inseri?.store ? (
		<div {...useBlockProps()}>
			<Provider store={inseri.store}>
				<SmartComponent attributes={attributes} setAttributes={setAttributes} />
			</Provider>
		</div>
	) : (
		<div {...useBlockProps()}>Store is loading</div>
	);
}
