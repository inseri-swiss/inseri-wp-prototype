import React, { useState, useEffect } from "react";

const wrapperStyle = { display: "flex", flexDirection: "column" };

const analyze = (key, text) => {
	return (text?.match(new RegExp(key, "gi")) || []).length;
};

export function DumpComponent(props) {
	const { attributes, setAttributes, count = 0, setCount = (a) => {} } = props;
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
				onInput={(event) => setCount(analyze(matchkey, event.target.value))}
			/>
			<span>Found: {count}</span>
		</div>
	);
}

export function SmartComponent(props) {
	const [count, setCount] = useState(0);
	return <DumpComponent {...props} count={count} setCount={setCount} />;
}
