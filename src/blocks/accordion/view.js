const PANEL_HIDDEN_CLASS = 'blocksuite-accordion-item__panel-hidden';
const PANEL_EXPANDING_CLASS = 'blocksuite-panel-is-expanding';
const PANEL_COLLAPSING_CLASS = 'blocksuite-panel-is-collapsing';
const ACTIVE_CLASS = 'is-active';

const getTransitionDuration = ( element ) => {
	const duration = window.getComputedStyle( element ).transitionDuration;
	const parsed = Number.parseFloat( duration );

	return Number.isFinite( parsed ) ? parsed * 1000 : 350;
};

const openPanel = ( panel, header, done, animate = true ) => {
	panel.classList.remove( PANEL_HIDDEN_CLASS );
	panel.classList.add( ACTIVE_CLASS );
	header.classList.add( ACTIVE_CLASS );
	header.setAttribute( 'aria-expanded', 'true' );

	if ( ! animate ) {
		panel.style.height = '';
		done();
		return;
	}

	panel.style.height = '0px';
	panel.offsetHeight;
	panel.classList.add( PANEL_EXPANDING_CLASS );
	panel.style.height = `${ panel.scrollHeight }px`;
	window.dispatchEvent( new Event( 'resize' ) );

	window.setTimeout( () => {
		panel.classList.remove( PANEL_EXPANDING_CLASS );
		panel.style.height = '';
		done();
	}, getTransitionDuration( panel ) );
};

const closePanel = ( panel, header, done, animate = true ) => {
	panel.classList.remove( ACTIVE_CLASS );
	header.classList.remove( ACTIVE_CLASS );
	header.setAttribute( 'aria-expanded', 'false' );

	if ( ! animate ) {
		panel.classList.add( PANEL_HIDDEN_CLASS );
		panel.style.height = '';
		done();
		return;
	}

	panel.style.height = `${ panel.scrollHeight }px`;
	panel.offsetHeight;
	panel.style.height = '0px';
	panel.classList.add( PANEL_COLLAPSING_CLASS );

	window.setTimeout( () => {
		panel.classList.add( PANEL_HIDDEN_CLASS );
		panel.classList.remove( PANEL_COLLAPSING_CLASS );
		panel.style.height = '';
		done();
	}, getTransitionDuration( panel ) );
};

const initializeAccordion = ( container ) => {
	const allowMultipleOpen = container.getAttribute( 'data-allow-multiple-open' ) === 'true';
	const startOpen = container.getAttribute( 'data-start-open' );
	const panes = Array.from( container.children );
	const headers = panes.map( ( pane ) => pane.querySelector( '.blocksuite-accordion-item__header' ) );
	const panels = panes.map( ( pane ) => pane.querySelector( '.blocksuite-accordion-item__panel' ) );
	let isToggling = false;

	if ( ! headers.length || ! panels.length ) {
		return;
	}

	panels.forEach( ( panel, index ) => {
		const header = headers[ index ];

		if ( ! panel || ! header ) {
			return;
		}

		panel.classList.add( PANEL_HIDDEN_CLASS );
		panel.classList.remove( ACTIVE_CLASS, PANEL_COLLAPSING_CLASS, PANEL_EXPANDING_CLASS );
		header.classList.remove( ACTIVE_CLASS );
		header.setAttribute( 'aria-expanded', 'false' );
	} );

	if ( startOpen !== 'none' ) {
		const openIndex = Number.parseInt( startOpen, 10 );

		if ( Number.isInteger( openIndex ) && panels[ openIndex ] && headers[ openIndex ] ) {
			openPanel( panels[ openIndex ], headers[ openIndex ], () => {}, false );
		}
	}

	headers.forEach( ( header, index ) => {
		const panel = panels[ index ];

		if ( ! header || ! panel ) {
			return;
		}

		header.addEventListener( 'click', () => {
			if ( isToggling ) {
				return;
			}

			isToggling = true;

			const isActive = panel.classList.contains( ACTIVE_CLASS );
			const closeCurrent = ( next ) => closePanel( panel, header, next, true );
			const openCurrent = ( next ) => openPanel( panel, header, next, true );

			if ( isActive ) {
				closeCurrent( () => {
					isToggling = false;
				} );
				return;
			}

			if ( ! allowMultipleOpen ) {
				const currentlyOpenIndex = panels.findIndex(
					( node ) => node && node.classList.contains( ACTIVE_CLASS )
				);

				if ( currentlyOpenIndex !== -1 ) {
					closePanel( panels[ currentlyOpenIndex ], headers[ currentlyOpenIndex ], () => {
						openCurrent( () => {
							isToggling = false;
						} );
					} );
					return;
				}
			}

			openCurrent( () => {
				isToggling = false;
			} );
		} );
	} );

	container.classList.add( 'blocksuite-accordion-initialized' );
};

const init = () => {
	const accordions = document.querySelectorAll( '.blocksuite-accordion-inner-wrap' );
	accordions.forEach( initializeAccordion );
};

window.addEventListener( 'kb-query-loaded', init );

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
