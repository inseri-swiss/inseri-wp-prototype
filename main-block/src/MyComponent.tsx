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
				<div key={m.field + m.block}>
					{m.block} {m.field}
				</div>
			))}
		</div>
	);
}

function SmartInnerComponent(props: any) {
	const metaObj = useSelector((state: any) => state["inseri/meta"].fields);
	const dispatch = useDispatch();
	return <DumpComponent {...props} dispatch={dispatch} metaObj={metaObj} />;
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
