import React, { useState, useEffect } from "react";
import {
	Button,
	TextControl,
	PanelBody,
	SelectControl,
	TextareaControl,
	Panel,
} from "@wordpress/components";

declare var wpApiSettings: { nonce: string };

const methods = ["GET", "POST", "PUT", "DELETE"].map((i) => ({
	label: i,
	value: i,
}));

export default function MyComponent() {
	const [items, setItems] = useState([]);
	const [isOpen, setOpen] = useState(true);
	const [tryResponse, setResponse] = useState("");

	const [reqBody, setReqBody] = useState("");
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
		setMethod("GET");
		setUrl("");
		setReqBody("");
		setResponse("");
	};

	const chooseItem = (id: number) => {
		const { name, url, method }: any = items.filter((i) => i.id === id)[0];

		setName(name);
		setUrl(url);
		setMethod(method);
	};

	const tryAction = async () => {
		const headers = reqBody ? { "Content-Type": "application/json" } : {};

		const res = await fetch(url, {
			method,
			headers,
			body: reqBody ? reqBody : undefined,
		});

		const result = await res.text();
		setResponse(result);
	};

	useEffect(() => {
		loadContent();
	}, []);

	return (
		<div className="wrap">
			<Panel header="Inseri Panel">
				<PanelBody
					title={"Add Datasource"}
					opened={isOpen}
					onToggle={() => setOpen(!isOpen)}
				>
					<div
						style={{
							margin: "12px 0",
						}}
					>
						<div
							style={{
								display: "inline",
								padding: "0 10px 0 0",
							}}
						>
							<Button variant="primary" onClick={insertContent}>
								Insert
							</Button>
						</div>
						<Button variant="primary" onClick={tryAction}>
							Try
						</Button>
					</div>

					<TextControl
						label="Datasource Name"
						onChange={setName}
						value={name}
					/>
					<SelectControl
						label="HTTP Method"
						onChange={setMethod as any}
						value={method ? method : "GET"}
						options={methods}
					/>
					<TextControl label="URL" onChange={setUrl} value={url} />
					<TextareaControl
						label="Request Body"
						value={reqBody}
						onChange={setReqBody}
					/>
					<TextareaControl
						label="Response"
						value={tryResponse}
						onChange={null}
					/>
				</PanelBody>

				<PanelBody>
					<table className="wp-list-table widefat fixed striped table-view-list">
						<thead>
							<tr>
								<th style={{ width: "5%" }}>Id</th>
								<th>Name</th>
								<th style={{ width: "5%" }}>Method</th>
								<th>Url</th>
								<th></th>
							</tr>
						</thead>

						<tbody>
							{items.map(({ id, name, url, method }) => (
								<tr
									key={id}
									onClick={() => chooseItem(id)}
									style={{ cursor: "pointer" }}
								>
									<td>{id}</td>
									<td className="row-title">{name}</td>
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
				</PanelBody>
			</Panel>
		</div>
	);
}
