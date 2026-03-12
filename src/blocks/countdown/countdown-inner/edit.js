import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [
	[
		'core/paragraph',
		{
			content: __( 'Countdown finished. Add your replacement content here.', 'blocksuite' ),
		},
	],
];

export default function Edit( { attributes } ) {
	const { location } = attributes;

	return (
		<div
			{ ...useBlockProps( {
				className: `blocksuite-countdown-inner blocksuite-countdown-inner-${ location }`,
			} ) }
		>
			<InnerBlocks template={ TEMPLATE } />
		</div>
	);
}
