import { useBlockProps } from '@wordpress/block-editor';
import MyComponent from './MyComponent';


export default function save({attributes}) {
	return (
		<div { ...useBlockProps.save()} data-attributes={JSON.stringify(attributes)}>
			<MyComponent {...attributes} />
		</div>
	);
}
