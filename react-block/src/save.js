import { useBlockProps } from "@wordpress/block-editor";
import { DumpComponent } from "./MyComponent";

export default function save(props) {
	const { attributes } = props;

	return (
		<div {...useBlockProps.save()} data-attributes={JSON.stringify(attributes)}>
			<DumpComponent attributes={attributes} />
		</div>
	);
}
