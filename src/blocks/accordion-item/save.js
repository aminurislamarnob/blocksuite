import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title } = attributes;

	return (
		<div { ...useBlockProps.save( { className: 'blocksuite-accordion-item' } ) }>
			<div className="blocksuite-accordion-item__header-wrap">
				<button className="blocksuite-accordion-item__header" type="button" aria-expanded="false">
					<RichText.Content tagName="span" className="blocksuite-accordion-item__title" value={ title } />
					<span className="blocksuite-accordion-item__icon" aria-hidden="true" />
				</button>
			</div>
			<div className="blocksuite-accordion-item__panel blocksuite-accordion-item__panel-hidden">
				<div className="blocksuite-accordion-item__panel-inner">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
