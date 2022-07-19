import React, { useState } from "react";

declare var wpApiSettings: { nonce: string };
const wrapperStyle: any = { display: "flex", flexDirection: "column" };

export default function MyComponent() {
	const [counter, setCounter] = useState(4);

	const fire = async () => {
		const res = await fetch(
			"http://localhost:8888/wp-json/inseri/v1/datasources/",
			{
				headers: {
					"X-WP-Nonce": wpApiSettings.nonce,
				},
			}
		);

		const j = await res.json();
		console.log(j);
	};
	const fire2 = async () => {
		const res = await fetch(
			"http://localhost:8888/wp-json/inseri/v1/datasources/",
			{
				method: "POST",
				headers: {
					"X-WP-Nonce": wpApiSettings.nonce,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: "unizhPOST", url: "https://uzh.ch" }),
			}
		);
		const j = await res.text();
		console.log(j);
	};

	return (
		<div style={wrapperStyle}>
			<button onClick={() => setCounter(counter + 1)}>Plus</button>
			<div>{counter}</div>
			<button onClick={fire2}>Fire</button>
		</div>
	);
}
