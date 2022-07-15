import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withInseri } from "./withInseri";
const wrapperStyle: any = { display: "flex", flexDirection: "column" };
import { counterSlice, decrement, increment } from "./store";

export function DumpComponent(props: any) {
	const { metaObj = [], dispatch = () => {} } = props;

	return (
		<div style={wrapperStyle}>
			<button onClick={() => dispatch(increment())}>Plus</button>
			<button onClick={() => dispatch(decrement())}>Minus</button>
		</div>
	);
}

function SmartInnerComponent(props: any) {
	const metaObj = useSelector((state: any) => state["inseri/meta"]);
	const dispatch = useDispatch();
	return <DumpComponent {...props} dispatch={dispatch} metaObj={metaObj} />;
}

const metaItems = [
	{
		field: "counter",
		block: "inseri/block-a",
	},
];
export const SmartComponent = withInseri(SmartInnerComponent, {
	block: "inseri/block-a",
	reducer: counterSlice.reducer,
	metaItems,
});
