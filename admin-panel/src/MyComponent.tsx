import React, { useState, useEffect } from "react";
import {
	Button,
	TextControl,
	TabPanel,
	SelectControl,
} from "@wordpress/components";

declare var wpApiSettings: { nonce: string };
const wrapperStyle: any = {
	display: "flex",
	flexDirection: "column",
};

const methods = ["GET", "POST", "PUT", "DELETE"].map((i) => ({
	label: i,
	value: i,
}));

export default function MyComponent() {
	const [items, setItems] = useState([]);
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [method, setMethod] = useState("GET");

	const deleteItem = async (id: number) => {
		const res = await fetch(`/wp-json/inseri/v1/datasources/${id}`, {
			method: "DELETE",
			headers: {
				"X-WP-Nonce": wpApiSettings.nonce,
			},
		});
		await res;
		loadContent();
	};

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
			body: JSON.stringify({ name, url, method }),
		});
		loadContent();
		setName("");
		setUrl("");
	};

	useEffect(() => {
		loadContent();
	}, []);

	return (
		<TabPanel
			tabs={[
				{
					name: "tab1",
					title: "Datasources",
				},
				{
					name: "tab2",
					title: "Add new one",
				},
			]}
		>
			{(tab) => {
				switch (tab.name) {
					case "tab1":
						return (
							<div className="wrap">
								<table className="wp-list-table widefat fixed striped table-view-list">
									<thead>
										<tr>
											<th>Id</th>
											<th>Name</th>
											<th>Method</th>
											<th>Url</th>
											<th></th>
										</tr>
									</thead>

									<tbody>
										{items.map(({ id, name, url, method }) => (
											<tr key={id}>
												<td>{id}</td>
												<td>{name}</td>
												<td>{method}</td>
												<td>{url}</td>
												<td>
													<Button
														onClick={() => deleteItem(id)}
														variant="secondary"
														isSmall
													>
														Delete
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						);

					case "tab2":
						return (
							<div className="wrap">
								<div style={{ margin: "8px" }}>
									{" "}
									<TextControl
										label="Datasource Name"
										onChange={setName}
										value={name}
									/>
									<SelectControl
										label="HTTP Method"
										onChange={setMethod as any}
										options={methods}
									/>
									<TextControl label="URL" onChange={setUrl} value={url} />
									<Button variant="primary" onClick={insertContent}>
										Insert
									</Button>
								</div>
							</div>
						);
				}
			}}
		</TabPanel>
	);
}
