<?php

namespace WeLabs\Blocksuite;

/**
 * Handles Gutenberg block registration.
 */
class BlockManager {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'register_blocks' ] );
		add_filter( 'block_categories_all', [ $this, 'register_block_category' ], 10, 2 );
	}

	/**
	 * Register all blocks generated into build/blocks.
	 *
	 * @return void
	 */
	public function register_blocks() {
		$block_files = $this->get_block_json_files();

		if ( empty( $block_files ) ) {
			return;
		}

		foreach ( $block_files as $block_file ) {
			$block_dir = dirname( $block_file );
			register_block_type( $block_dir );
		}
	}

	/**
	 * Get all block.json files recursively from build/blocks.
	 *
	 * @return array
	 */
	private function get_block_json_files() {
		$blocks_dir = BLOCKSUITE_BUILD_DIR . '/blocks';

		if ( ! is_dir( $blocks_dir ) ) {
			return [];
		}

		$iterator = new \RecursiveIteratorIterator(
			new \RecursiveDirectoryIterator( $blocks_dir, \FilesystemIterator::SKIP_DOTS )
		);

		$block_files = [];

		foreach ( $iterator as $file ) {
			if ( $file->isFile() && 'block.json' === $file->getFilename() ) {
				$block_files[] = $file->getPathname();
			}
		}

		return $block_files;
	}

	/**
	 * Add Blocksuite block category in editor inserter.
	 *
	 * @param array  $categories Existing categories.
	 * @param object $post       Current post instance.
	 *
	 * @return array
	 */
	public function register_block_category( $categories, $post ) {
		unset( $post );

		$categories[] = [
			'slug'  => 'blocksuite',
			'title' => esc_html__( 'Blocksuite', 'blocksuite' ),
			'icon'  => null,
		];

		return $categories;
	}
}
