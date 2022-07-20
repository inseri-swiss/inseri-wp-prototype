import React, { useState, useEffect } from "react";
import { Button, TextControl } from "@wordpress/components";

declare var wpApiSettings: { nonce: string };
const wrapperStyle: any = {
	display: "flex",
	flexDirection: "column",
};

export default function MyComponent() {
	const [items, setItems] = useState([]);
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");

	const loadContent = async () => {
		const res = await fetch("/wp-json/inseri/v1/datasources/", {
			headers: {
				"X-WP-Nonce": wpApiSettings.nonce,
			},
		});

		const j = await res.json();
		setItems(j);
	};
	const insertContent = async () => {
		const res = await fetch("/wp-json/inseri/v1/datasources/", {
			method: "POST",
			headers: {
				"X-WP-Nonce": wpApiSettings.nonce,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, url }),
		});
		loadContent();
		setName("");
		setUrl("");
	};

	useEffect(() => {
		loadContent();
	}, []);

	return (
		<div style={wrapperStyle}>
			<div style={{ margin: "8px" }}>
				<TextControl label="URL" onChange={setUrl} value={url} />
				<TextControl label="Datasource Name" onChange={setName} value={name} />
				<Button variant="primary" onClick={insertContent}>
					Insert
				</Button>
			</div>

			<table style={{ textAlign: "left", margin: "8px" }}>
				<tbody>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Url</th>
					</tr>
					{items.map(({ id, name, url }) => (
						<tr key={id}>
							<td>{id}</td>
							<td>{name}</td>
							<td>{url}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
