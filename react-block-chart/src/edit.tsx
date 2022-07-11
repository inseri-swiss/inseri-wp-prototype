import React from "react";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";
import { SmartComponent } from "./MyComponent";

export default function Edit({ attributes, setAttributes }: any) {
	return (
		<div {...useBlockProps()}>
			<SmartComponent attributes={attributes} setAttributes={setAttributes} />
		</div>
	);
}
