import {
    TextControl
} from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({attributes, setAttributes}) {
	const title = attributes.title

	return (
		<div { ...useBlockProps() }>
			<TextControl onChange={(val) => setAttributes( { title: val } )} value={title} />
		</div>
	);
}
