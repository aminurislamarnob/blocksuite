import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const { title } = attributes;
	const [ isOpen, setIsOpen ] = useState( true );

	return (
		<div { ...useBlockProps( { className: 'blocksuite-accordion-item' } ) }>
			<div className="blocksuite-accordion-item__header-wrap">
				<Button
					variant="tertiary"
					className={ `blocksuite-accordion-item__header ${
						isOpen ? 'blocksuite-accordion-item__header-active' : ''
					}` }
					onClick={ () => setIsOpen( ! isOpen ) }
					aria-expanded={ isOpen ? 'true' : 'false' }
				>
					<RichText
						tagName="span"
						className="blocksuite-accordion-item__title"
						value={ title }
						placeholder={ __( 'Accordion item title', 'blocksuite' ) }
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>
					<span className="blocksuite-accordion-item__icon" />
				</Button>
			</div>
			{ isOpen && (
				<div className="blocksuite-accordion-item__panel">
					<div className="blocksuite-accordion-item__panel-inner">
						<InnerBlocks />
					</div>
				</div>
			) }
		</div>
	);
}
