import React from "react";
import { useDispatch, useSelect } from "@wordpress/data";
import "./store";

const wrapperStyle = { display: "flex", flexDirection: "column" };

const analyze = (key, text) => {
	return (text?.match(new RegExp(key, "gi")) || []).length;
};

export function DumpComponent(props) {
	const {
		attributes,
		setAttributes,
		countObj = {},
		setCount = (a, b) => {},
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
				type="text"
				disabled={isEdit}
				onInput={(event) => {
					setCount(matchkey, analyze(matchkey, event.target.value));
				}}
			/>
			<span>Found: {countObj[matchkey]}</span>
		</div>
	);
}

export function SmartComponent(props) {
	const dispatch = useDispatch("counters");
	const countObj = useSelect((select) => select("counters").getCounters(), []);
	return (
		<DumpComponent
			{...props}
			countObj={countObj}
			setCount={(key, count) => dispatch.setFound(key, count)}
		/>
	);
}
