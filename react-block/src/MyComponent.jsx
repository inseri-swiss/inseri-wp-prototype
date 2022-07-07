import React, { useState, useEffect } from "react";
import { useDispatch, useSelect } from "@wordpress/data";
import { store } from "./store";
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
	const keys = Object.keys(countObj);

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
			{keys.map((k) => (
				<span key={k}>
					Found {k}: {countObj[k]}
				</span>
			))}
		</div>
	);
}

export function SmartComponent(props) {
	const dispatch = useDispatch(store);
	const countObj = useSelect((select) => select(store).getCounters(), []);
	return (
		<DumpComponent
			{...props}
			countObj={countObj}
			setCount={(key, count) => dispatch.setFound(key, count)}
		/>
	);
}
