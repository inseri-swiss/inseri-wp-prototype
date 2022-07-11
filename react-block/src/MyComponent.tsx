import React from "react";
import { useDispatch, useSelect } from "@wordpress/data";
import "./store";

const wrapperStyle: any = { display: "flex", flexDirection: "column" };

const analyze = (key: string, text: string) => {
	return (text?.match(new RegExp(key, "gi")) || []).length;
};

export function DumpComponent(props: any) {
	const {
		attributes,
		setAttributes,
		countObj = {},
		setCount = (a:any, b: any) => {},
	} = props;
	const { matchkey } = attributes;
	const isEdit = !!setAttributes;

	return (
		<div style={wrapperStyle}>
			<label htmlFor="fname">Matching key</label>
			{isEdit ? (
				<input
					id="fname"
					type="text"
					onChange={(event) => setAttributes({ matchkey: event.target.value })}
					value={matchkey}
				/>
			) : (
				<span className="label">{matchkey}</span>
			)}
			<label htmlFor="lname">Enter text for analysing</label>
			<textarea
				id="lname"
				disabled={isEdit}
				onInput={(event: any) => {
					setCount(matchkey, analyze(matchkey, event.target.value));
				}}
			/>
			<span>Found: {countObj[matchkey]}</span>
		</div>
	);
}

export function SmartComponent(props: any) {
	const dispatch = useDispatch("counters");
	const countObj = useSelect((select) => select("counters").getCounters(), []);
	return (
		<DumpComponent
			{...props}
			countObj={countObj}
			setCount={(key: string, count: number) => dispatch.setFound(key, count)}
		/>
	);
}
