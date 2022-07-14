import React from "react";
import { decrement, increment } from "./counter";
import { useSelector, useDispatch } from "react-redux";
const wrapperStyle: any = { display: "flex", flexDirection: "column" };

export function DumpComponent(props: any) {
	const { count = 0, dispatch = (a: any) => {} } = props;

	return (
		<div style={wrapperStyle}>
			<span>{count}</span>
			<button onClick={() => dispatch(increment())}>plus</button>
			<button onClick={() => dispatch(decrement())}>minus</button>
		</div>
	);
}

export function SmartComponent(props: any) {
	const count = useSelector((state: any) => state.counter.value);
	const dispatch = useDispatch();
	return <DumpComponent {...props} count={count} dispatch={dispatch} />;
}
