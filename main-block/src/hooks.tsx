import React from "react";
import { PanelBody, Button } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (props.name !== "core/image") {
			return <BlockEdit {...props} />;
		}

		const doSomething = () => {
			props.setAttributes({
				"inseri-foo": { no: Math.floor(Math.random() * 100) },
			});
		};

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody>
						My Foo control
						<br />
						<Button variant="primary" onClick={doSomething}>
							inject attribute
						</Button>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, "withInspectorControl");

addFilter(
	"editor.BlockEdit",
	"inseri/main-block/with-inspector-controls",
	withInspectorControls
);

function addAttributes(settings: any, name: string) {
	if (name === "core/image") {
		return {
			...settings,
			attributes: {
				...settings.attributes,
				"inseri-foo": {
					type: "object",
					default: null,
				},
			},
		};
	}
	return settings;
}

addFilter(
	"blocks.registerBlockType",
	"inseri/main-block/add-attributes",
	addAttributes
);
