import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const { message } = attributes;

	return (
		<div { ...useBlockProps( { className: 'blocksuite-notice' } ) }>
			<RichText
				tagName="p"
				value={ message }
				placeholder={ __( 'Write your notice...', 'blocksuite' ) }
				onChange={ ( value ) => setAttributes( { message: value } ) }
			/>
		</div>
	);
}
