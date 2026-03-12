import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { PanelBody, SelectControl, ToggleControl, TextControl, DateTimePicker } from '@wordpress/components';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const TEMPLATE = [
	[ 'blocksuite/countdown-timer', {} ],
	[ 'blocksuite/countdown-inner', { location: 'complete' } ],
];

const getDefaultFutureDate = () => {
	const date = new Date();
	date.setDate( date.getDate() + 2 );
	return date;
};

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueID,
		timestamp,
		expireAction,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		timerLayout,
		countdownDivider,
		timeNumbers,
		counterAlign,
		preLabel,
		postLabel,
		daysLabel,
		hoursLabel,
		minutesLabel,
		secondsLabel,
	} = attributes;

	useEffect( () => {
		if ( ! uniqueID ) {
			setAttributes( { uniqueID: clientId.slice( 0, 8 ) } );
		}

		if ( ! timestamp ) {
			setAttributes( { timestamp: getDefaultFutureDate().getTime() } );
		}
	}, [ uniqueID, timestamp, clientId, setAttributes ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Countdown Settings', 'blocksuite' ) } initialOpen={ true }>
					<DateTimePicker
						currentDate={ timestamp ? new Date( timestamp ).toISOString() : undefined }
						onChange={ ( value ) => setAttributes( { timestamp: new Date( value ).getTime() } ) }
					/>
					<SelectControl
						label={ __( 'Action on Expire', 'blocksuite' ) }
						value={ expireAction }
						options={ [
							{ label: __( 'Show timer at zero', 'blocksuite' ), value: 'none' },
							{ label: __( 'Show expire content', 'blocksuite' ), value: 'message' },
						] }
						onChange={ ( value ) => setAttributes( { expireAction: value } ) }
					/>
					<SelectControl
						label={ __( 'Layout', 'blocksuite' ) }
						value={ timerLayout }
						options={ [
							{ label: __( 'Block', 'blocksuite' ), value: 'block' },
							{ label: __( 'Inline', 'blocksuite' ), value: 'inline' },
						] }
						onChange={ ( value ) => setAttributes( { timerLayout: value } ) }
					/>
					<SelectControl
						label={ __( 'Alignment', 'blocksuite' ) }
						value={ counterAlign }
						options={ [
							{ label: __( 'Left', 'blocksuite' ), value: 'left' },
							{ label: __( 'Center', 'blocksuite' ), value: 'center' },
							{ label: __( 'Right', 'blocksuite' ), value: 'right' },
						] }
						onChange={ ( value ) => setAttributes( { counterAlign: value } ) }
					/>
					<ToggleControl
						label={ __( 'Enable dividers', 'blocksuite' ) }
						checked={ countdownDivider }
						onChange={ ( value ) => setAttributes( { countdownDivider: value } ) }
					/>
					<ToggleControl
						label={ __( 'Enable 00 number format', 'blocksuite' ) }
						checked={ timeNumbers }
						onChange={ ( value ) => setAttributes( { timeNumbers: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show days', 'blocksuite' ) }
						checked={ showDays }
						onChange={ ( value ) => setAttributes( { showDays: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show hours', 'blocksuite' ) }
						checked={ showHours }
						onChange={ ( value ) => setAttributes( { showHours: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show minutes', 'blocksuite' ) }
						checked={ showMinutes }
						onChange={ ( value ) => setAttributes( { showMinutes: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show seconds', 'blocksuite' ) }
						checked={ showSeconds }
						onChange={ ( value ) => setAttributes( { showSeconds: value } ) }
					/>
					<TextControl
						label={ __( 'Pre text', 'blocksuite' ) }
						value={ preLabel }
						onChange={ ( value ) => setAttributes( { preLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Post text', 'blocksuite' ) }
						value={ postLabel }
						onChange={ ( value ) => setAttributes( { postLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Days label', 'blocksuite' ) }
						value={ daysLabel }
						onChange={ ( value ) => setAttributes( { daysLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Hours label', 'blocksuite' ) }
						value={ hoursLabel }
						onChange={ ( value ) => setAttributes( { hoursLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Minutes label', 'blocksuite' ) }
						value={ minutesLabel }
						onChange={ ( value ) => setAttributes( { minutesLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Seconds label', 'blocksuite' ) }
						value={ secondsLabel }
						onChange={ ( value ) => setAttributes( { secondsLabel: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					className: `blocksuite-countdown-container blocksuite-countdown-layout-${ timerLayout } blocksuite-countdown-align-${ counterAlign }`,
				} ) }
			>
				<InnerBlocks template={ TEMPLATE } templateLock="all" />
			</div>
		</>
	);
}
