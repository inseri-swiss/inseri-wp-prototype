import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const wrapperStyle: any = { display: "flex", flexDirection: "column" };
import { addDataType } from "./store";

export function DumpComponent(props: any) {
	const { metaObj = [], dispatch = () => {} } = props;

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

export function SmartComponent(props: any) {
	const metaObj = useSelector((state: any) => state["inseri/meta"]);
	const dispatch = useDispatch();
	useEffect(() => {
		const a = {
			name: "val",
			displayName: "super value",
			namespace: "my/plugin",
			description: "example text",
		};
		dispatch(addDataType(a));
	}, []);

	return <DumpComponent {...props} dispatch={dispatch} metaObj={metaObj} />;
}
