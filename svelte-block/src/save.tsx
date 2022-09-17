import React from "react";
import { useBlockProps } from "@wordpress/block-editor";

export default function save(props: any) {
	const { attributes } = props;

	return (
		<div {...useBlockProps.save()} data-attributes={JSON.stringify(attributes)}>
			Loading...
		</div>
	);
}
