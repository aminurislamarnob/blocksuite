import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { message } = attributes;

	return (
		<div { ...useBlockProps.save( { className: 'blocksuite-notice' } ) }>
			<RichText.Content tagName="p" value={ message } />
		</div>
	);
}
