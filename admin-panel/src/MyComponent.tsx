import React, { useState } from "react";

declare var wpApiSettings: { nonce: string };
const wrapperStyle: any = { display: "flex", flexDirection: "column" };

export default function MyComponent() {
	const [counter, setCounter] = useState(4);

	const fire = async () => {
		console.log("=====>", wpApiSettings.nonce);
		const res = await fetch("http://localhost:8888/wp-json/wp/v2/settings", {
			headers: {
				"X-WP-Nonce": wpApiSettings.nonce,
			},
		});

		const j = await res.json();
		console.log(j);
	};

	return (
		<div style={wrapperStyle}>
			<button onClick={() => setCounter(counter + 1)}>Plus</button>
			<div>{counter}</div>
			<button onClick={fire}>Fire</button>
		</div>
	);
}
