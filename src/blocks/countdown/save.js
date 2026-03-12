import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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

	const classes = `blocksuite-countdown-container blocksuite-countdown-layout-${ timerLayout } blocksuite-countdown-align-${ counterAlign }`;

	return (
		<div
			{ ...useBlockProps.save( {
				className: classes,
				'data-id': uniqueID,
				'data-timestamp': timestamp,
				'data-expire-action': expireAction,
				'data-show-days': showDays ? 'true' : 'false',
				'data-show-hours': showHours ? 'true' : 'false',
				'data-show-minutes': showMinutes ? 'true' : 'false',
				'data-show-seconds': showSeconds ? 'true' : 'false',
				'data-countdown-divider': countdownDivider ? 'true' : 'false',
				'data-time-numbers': timeNumbers ? 'true' : 'false',
				'data-pre-label': preLabel || '',
				'data-post-label': postLabel || '',
				'data-days-label': daysLabel || 'Days',
				'data-hours-label': hoursLabel || 'Hrs',
				'data-minutes-label': minutesLabel || 'Mins',
				'data-seconds-label': secondsLabel || 'Secs',
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
