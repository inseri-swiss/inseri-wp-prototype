import React from "react";
import { useBlockProps } from "@wordpress/block-editor";
//@ts-ignore
import App from "./App.svelte";

const a = () => {
	const { html, head } = App.render();
	console.log(">>>>>>>>>>>", head);
	return html;
};

export default function save(props: any) {
	const { attributes } = props;

	return (
		<div
			{...useBlockProps.save()}
			data-attributes={JSON.stringify(attributes)}
			dangerouslySetInnerHTML={{ __html: a() }}
		></div>
	);
}
