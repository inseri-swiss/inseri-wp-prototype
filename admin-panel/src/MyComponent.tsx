import React, { useState } from "react";

const wrapperStyle: any = { display: "flex", flexDirection: "column" };

export default function MyComponent() {
	const [counter, setCounter] = useState(4);
	return (
		<div>
			<button onClick={() => setCounter(counter + 1)}>Plus</button>
			<div>{counter}</div>
		</div>
	);
}
