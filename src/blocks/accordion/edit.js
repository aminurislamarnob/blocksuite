import { __ } from '@wordpress/i18n';
import { ToggleControl, PanelBody } from '@wordpress/components';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'blocksuite/accordion-item' ];
const TEMPLATE = [
	[ 'blocksuite/accordion-item', { title: __( 'Accordion Item 1', 'blocksuite' ) } ],
	[ 'blocksuite/accordion-item', { title: __( 'Accordion Item 2', 'blocksuite' ) } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const { allowMultipleOpen, startCollapsed } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Settings', 'blocksuite' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Allow multiple open items', 'blocksuite' ) }
						checked={ allowMultipleOpen }
						onChange={ ( value ) => setAttributes( { allowMultipleOpen: value } ) }
					/>
					<ToggleControl
						label={ __( 'Start with all items collapsed', 'blocksuite' ) }
						checked={ startCollapsed }
						onChange={ ( value ) => setAttributes( { startCollapsed: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'blocksuite-accordion' } ) }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />
			</div>
		</>
	);
}
