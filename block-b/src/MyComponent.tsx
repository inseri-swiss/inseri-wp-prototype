import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withInseri } from "./withInseri";
const wrapperStyle: any = { display: "flex", flexDirection: "column" };
import { textSlice, setText, reset } from "./store";

export function DumpComponent(props: any) {
	const { text = "", dispatch = () => {} } = props;

	return (
		<div style={wrapperStyle}>
			<button onClick={() => dispatch(reset())}>Reset Text</button>
			<input
				type="text"
				value={text}
				onChange={(e) => dispatch(setText({ text: e.target.value }))}
			/>
		</div>
	);
}

function SmartInnerComponent(props: any) {
	const text = useSelector((state: any) => state["inseri/block-b"]?.text);
	const dispatch = useDispatch();
	return <DumpComponent {...props} dispatch={dispatch} text={text} />;
}

const metaItems = [
	{
		field: "text",
		block: "inseri/block-b",
	},
];
export const SmartComponent = withInseri(SmartInnerComponent, {
	block: "inseri/block-b",
	reducer: textSlice.reducer,
	metaItems,
});
