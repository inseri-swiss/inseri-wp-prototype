import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withInseri } from "./withInseri";
const wrapperStyle: any = { display: "flex", flexDirection: "column" };
import { fooSlice } from "./store";
import {
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from "@wordpress/block-editor";
import { Button, ColorPalette } from "@wordpress/components";

export function DumpComponent(props: any) {
	const { dispatch = () => {}, metaObj = {} } = props;
	const keys = Object.keys(metaObj);

	return (
		<>
			<button onClick={() => dispatch(fooSlice.actions.fooify())}>Fire</button>
			<div style={wrapperStyle}>
				{keys.map((k: any) => (
					<div key={k}>
						{k} {metaObj[k]}
					</div>
				))}
			</div>
		</>
	);
}

function SmartInnerComponent(props: any) {
	const metaObj = useSelector((state: any) => {
		const fields = state["inseri/meta"]?.fields || [];
		return fields
			.map(({ field, block }: any) => ({ [field]: state[block][field] }))
			.reduce((a: any, b: any) => ({ ...a, ...b }), {});
	});
	const dispatch = useDispatch();
	return (
		<>
			{/* Hovering Toolbar  */}
			<BlockControls>
				<Button>Foo</Button>
			</BlockControls>

			{/* Sidebar  */}
			<InspectorControls key="setting">
				<div>
					<fieldset>
						<legend className="blocks-base-control__label">GutenPride</legend>
						<ColorPalette // Element Tag for Gutenberg standard colour selector
							onChange={null} // onChange event callback
							colors={[]}
							value={""}
						/>
					</fieldset>
					<fieldset>
						<legend className="blocks-base-control__label">TextColor</legend>
						<ColorPalette // Element Tag for Gutenberg standard colour selector
							onChange={null} // onChange event callback
							colors={[]}
							value={""}
						/>
					</fieldset>
				</div>
			</InspectorControls>

			{/* block */}
			<DumpComponent {...props} dispatch={dispatch} metaObj={metaObj} />
		</>
	);
}

const metaItems = [
	{
		field: "foo",
		block: "inseri/foo",
	},
];
export const SmartComponent = withInseri(SmartInnerComponent, {
	block: "inseri/foo",
	reducer: fooSlice.reducer,
	metaItems,
});
