import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { allowMultipleOpen, startCollapsed, openPane } = attributes;

	return (
		<div { ...useBlockProps.save( { className: 'blocksuite-accordion-wrap' } ) }>
			<div
				className="blocksuite-accordion-inner-wrap"
				data-allow-multiple-open={ allowMultipleOpen ? 'true' : 'false' }
				data-start-open={ startCollapsed ? 'none' : String( openPane ) }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
