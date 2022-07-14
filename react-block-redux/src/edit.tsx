import React, { useEffect, useState } from "react";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";
import { SmartComponent } from "./MyComponent";
import { Provider } from "react-redux";

export default function Edit({ attributes, setAttributes }: any) {
	const inseri = (window as any).inseri;

	return inseri?.store ? (
		<div {...useBlockProps()}>
			<Provider store={inseri.store}>
				<SmartComponent attributes={attributes} setAttributes={setAttributes} />
			</Provider>
		</div>
	) : (
		<div>Store is loading</div>
	);
}
