import React from "react"

export default function MyComponent (props) {
	const { title } = props;

	return (
		<div  onClick={() => console.log("clicked")} style={{background: '#0ff'}}>
			<span>{title}</span>
		</div>)
}
