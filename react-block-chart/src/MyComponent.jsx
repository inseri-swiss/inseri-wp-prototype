import React from "react";
import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { PieChart } from "react-minimal-pie-chart";

const wrapperStyle = { display: "flex", flexDirection: "column" };

const generateColor = () =>
	"#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

export function DumpComponent(props) {
	const { children, setAttributes } = props;
	const isEdit = !!setAttributes;

	return (
		<div>
			{children && !isEdit ? (
				children
			) : (
				<span>Pie Chart will be generated</span>
			)}
		</div>
	);
}

export function SmartComponent(props) {
	const [colorObj, setColor] = useState({});

	const countObj = useSelect((select) => select("counters").getCounters());
	const keys = Object.keys(countObj);

	if (Object.keys(colorObj).length !== keys.length) {
		keys.forEach((k) => {
			if (!colorObj[k]) {
				colorObj[k] = generateColor();
			}
		});

		setColor(colorObj);
	}

	const data = keys.map((k) => ({
		title: k,
		value: countObj[k],
		color: colorObj[k],
	}));

	return (
		<DumpComponent {...props}>
			<PieChart data={data} />
			<div style={wrapperStyle}>
				{keys.map((k) => (
					<span key={k}>
						Found {k}: {countObj[k]}
					</span>
				))}
			</div>
		</DumpComponent>
	);
}
