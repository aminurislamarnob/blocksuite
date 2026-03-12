import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { location } = attributes;

	return (
		<div
			{ ...useBlockProps.save( {
				className: `blocksuite-countdown-inner blocksuite-countdown-inner-${ location }`,
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
