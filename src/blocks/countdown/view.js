const padNumber = ( value, useTwoDigits ) => {
	if ( ! useTwoDigits ) {
		return String( value );
	}

	return value > 9 ? String( value ) : `0${ value }`;
};

const getParts = ( totalMs, config ) => {
	const totalSeconds = Math.max( 0, Math.floor( totalMs / 1000 ) );
	const parts = {};

	if ( config.showDays ) {
		parts.days = Math.floor( totalSeconds / 86400 );
		parts.hours = Math.floor( ( totalSeconds % 86400 ) / 3600 );
		parts.minutes = Math.floor( ( totalSeconds % 3600 ) / 60 );
		parts.seconds = totalSeconds % 60;
		return parts;
	}

	if ( config.showHours ) {
		parts.hours = Math.floor( totalSeconds / 3600 );
		parts.minutes = Math.floor( ( totalSeconds % 3600 ) / 60 );
		parts.seconds = totalSeconds % 60;
		return parts;
	}

	if ( config.showMinutes ) {
		parts.minutes = Math.floor( totalSeconds / 60 );
		parts.seconds = totalSeconds % 60;
		return parts;
	}

	parts.seconds = totalSeconds;
	return parts;
};

const renderTimer = ( container, config, totalMs ) => {
	const timer = container.querySelector( '.blocksuite-countdown-timer' );

	if ( ! timer ) {
		return;
	}

	const labels = {
		days: config.daysLabel,
		hours: config.hoursLabel,
		minutes: config.minutesLabel,
		seconds: config.secondsLabel,
	};

	const parts = getParts( totalMs, config );
	const orderedKeys = [ 'days', 'hours', 'minutes', 'seconds' ].filter(
		( key ) => parts[ key ] !== undefined && config[ `show${ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }` ]
	);

	const html = [];

	if ( config.preLabel ) {
		html.push(
			`<div class="blocksuite-countdown-item blocksuite-countdown-item-pre"><span>${ config.preLabel }</span></div>`
		);
	}

	orderedKeys.forEach( ( part, index ) => {
		html.push(
			`<div class="blocksuite-countdown-item blocksuite-countdown-date-item-${ part }"><span class="blocksuite-countdown-number">${ padNumber( parts[ part ], config.timeNumbers ) }</span><span class="blocksuite-countdown-label">${ labels[ part ] }</span></div>`
		);

		if ( config.countdownDivider && index < orderedKeys.length - 1 ) {
			html.push(
				'<div class="blocksuite-countdown-item blocksuite-countdown-divider-item"><span class="blocksuite-countdown-number">:</span><span class="blocksuite-countdown-label">&nbsp;</span></div>'
			);
		}
	} );

	if ( config.postLabel ) {
		html.push(
			`<div class="blocksuite-countdown-item blocksuite-countdown-item-post"><span>${ config.postLabel }</span></div>`
		);
	}

	timer.innerHTML = html.join( '' );
};

const applyExpireState = ( container, config, isExpired ) => {
	const timer = container.querySelector( '.blocksuite-countdown-timer' );
	const completeInner = container.querySelector( '.blocksuite-countdown-inner-complete' );

	if ( ! timer || ! completeInner ) {
		return;
	}

	if ( config.expireAction === 'message' && isExpired ) {
		timer.style.display = 'none';
		completeInner.style.display = 'block';
		return;
	}

	timer.style.display = '';
	completeInner.style.display = 'none';
};

const initCountdown = ( container ) => {
	const timestamp = Number.parseInt( container.dataset.timestamp || '0', 10 );

	if ( ! timestamp ) {
		return;
	}

	const config = {
		expireAction: container.dataset.expireAction || 'none',
		showDays: container.dataset.showDays === 'true',
		showHours: container.dataset.showHours === 'true',
		showMinutes: container.dataset.showMinutes === 'true',
		showSeconds: container.dataset.showSeconds === 'true',
		countdownDivider: container.dataset.countdownDivider === 'true',
		timeNumbers: container.dataset.timeNumbers === 'true',
		preLabel: container.dataset.preLabel || '',
		postLabel: container.dataset.postLabel || '',
		daysLabel: container.dataset.daysLabel || 'Days',
		hoursLabel: container.dataset.hoursLabel || 'Hrs',
		minutesLabel: container.dataset.minutesLabel || 'Mins',
		secondsLabel: container.dataset.secondsLabel || 'Secs',
	};

	const tick = () => {
		const remaining = timestamp - Date.now();
		const expired = remaining <= 0;

		renderTimer( container, config, remaining );
		applyExpireState( container, config, expired );
	};

	tick();
	window.setInterval( tick, 1000 );
};

const init = () => {
	const countdowns = document.querySelectorAll( '.wp-block-blocksuite-countdown.blocksuite-countdown-container' );
	countdowns.forEach( initCountdown );
};

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
