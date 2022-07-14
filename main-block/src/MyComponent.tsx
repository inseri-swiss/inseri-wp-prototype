import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withInseri } from "./withInseri";
const wrapperStyle: any = { display: "flex", flexDirection: "column" };
import { fooSlice } from "./store";

export function DumpComponent(props: any) {
	const { metaObj = [] } = props;

	return (
		<div style={wrapperStyle}>
			{metaObj.map((m: any) => (
				<div key={m.name}>
					{m.namespace} {m.name}
				</div>
			))}
		</div>
	);
}

function SmartInnerComponent(props: any) {
	const metaObj = useSelector((state: any) => state["inseri/meta"]);
	const dispatch = useDispatch();
	return <DumpComponent {...props} dispatch={dispatch} metaObj={metaObj} />;
}

const reducerMap = { name: "inseri/foo", reducer: fooSlice.reducer };
const metaItems = [
	{
		name: "foo",
		displayName: "foo value",
		namespace: "my/foo",
		description: "example text",
	},
];
export const SmartComponent = withInseri(
	SmartInnerComponent,
	reducerMap,
	metaItems
);
