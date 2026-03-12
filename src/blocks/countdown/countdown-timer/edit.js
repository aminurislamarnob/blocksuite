import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const pad = ( value, useTwoDigits ) => {
	if ( ! useTwoDigits ) {
		return String( value );
	}

	return value > 9 ? String( value ) : `0${ value }`;
};

const buildParts = ( totalMs, attrs ) => {
	const totalSeconds = Math.max( 0, Math.floor( totalMs / 1000 ) );

	if ( attrs.showDays ) {
		return {
			days: Math.floor( totalSeconds / 86400 ),
			hours: Math.floor( ( totalSeconds % 86400 ) / 3600 ),
			minutes: Math.floor( ( totalSeconds % 3600 ) / 60 ),
			seconds: totalSeconds % 60,
		};
	}

	if ( attrs.showHours ) {
		return {
			hours: Math.floor( totalSeconds / 3600 ),
			minutes: Math.floor( ( totalSeconds % 3600 ) / 60 ),
			seconds: totalSeconds % 60,
		};
	}

	if ( attrs.showMinutes ) {
		return {
			minutes: Math.floor( totalSeconds / 60 ),
			seconds: totalSeconds % 60,
		};
	}

	return {
		seconds: totalSeconds,
	};
};

export default function Edit( { clientId } ) {
	const [ now, setNow ] = useState( Date.now() );

	const parentAttributes = useSelect(
		( select ) => {
			const { getBlockRootClientId, getBlock } = select( 'core/block-editor' );
			const parentClientId = getBlockRootClientId( clientId );
			return getBlock( parentClientId )?.attributes || {};
		},
		[ clientId ]
	);

	useEffect( () => {
		const id = window.setInterval( () => setNow( Date.now() ), 1000 );
		return () => window.clearInterval( id );
	}, [] );

	const {
		timestamp = 0,
		preLabel = '',
		postLabel = '',
		timeNumbers = false,
		countdownDivider = false,
		daysLabel = __( 'Days', 'blocksuite' ),
		hoursLabel = __( 'Hrs', 'blocksuite' ),
		minutesLabel = __( 'Mins', 'blocksuite' ),
		secondsLabel = __( 'Secs', 'blocksuite' ),
	} = parentAttributes;

	const remaining = timestamp ? timestamp - now : 0;
	const parts = buildParts( remaining, parentAttributes );
	const order = [ 'days', 'hours', 'minutes', 'seconds' ].filter( ( key ) => parts[ key ] !== undefined );
	const labels = {
		days: daysLabel,
		hours: hoursLabel,
		minutes: minutesLabel,
		seconds: secondsLabel,
	};

	return (
		<div { ...useBlockProps( { className: 'blocksuite-countdown-timer' } ) }>
			{ preLabel ? (
				<div className="blocksuite-countdown-item blocksuite-countdown-item-pre">{ preLabel }</div>
			) : null }
			{ order.map( ( part, index ) => (
				<div key={ part } style={ { display: 'contents' } }>
					<div className={ `blocksuite-countdown-item blocksuite-countdown-date-item-${ part }` }>
						<span className="blocksuite-countdown-number">{ pad( parts[ part ], timeNumbers ) }</span>
						<span className="blocksuite-countdown-label">{ labels[ part ] }</span>
					</div>
					{ countdownDivider && index < order.length - 1 ? (
						<div className="blocksuite-countdown-item blocksuite-countdown-divider-item">
							<span className="blocksuite-countdown-number">:</span>
							<span className="blocksuite-countdown-label">&nbsp;</span>
						</div>
					) : null }
				</div>
			) ) }
			{ postLabel ? (
				<div className="blocksuite-countdown-item blocksuite-countdown-item-post">{ postLabel }</div>
			) : null }
		</div>
	);
}
