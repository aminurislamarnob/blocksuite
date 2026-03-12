import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div { ...useBlockProps.save( { className: 'blocksuite-countdown-timer' } ) }>
			<div className="blocksuite-countdown-item blocksuite-countdown-date-item">
				<span className="blocksuite-countdown-number">&nbsp;</span>
				<span className="blocksuite-countdown-label">&nbsp;</span>
			</div>
		</div>
	);
}
