import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

registerBlockType<{}>(metadata.name, {
	title: metadata.title,
	category: metadata.category,
	attributes: metadata.attributes,
	script: metadata.script,
	edit: Edit,
	save,
});
