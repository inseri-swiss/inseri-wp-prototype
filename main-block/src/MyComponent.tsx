import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withInseri } from "./withInseri";
const wrapperStyle: any = { display: "flex", flexDirection: "column" };
import { fooSlice } from "./store";

export function DumpComponent(props: any) {
	const { metaObj = {} } = props;
	const keys = Object.keys(metaObj);

	return (
		<div style={wrapperStyle}>
			{keys.map((k: any) => (
				<div key={k}>
					{k} {metaObj[k]}
				</div>
			))}
		</div>
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
