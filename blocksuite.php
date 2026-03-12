<?php
/**
 * Plugin Name: Blocksuite
 * Plugin URI:  https://welabs.dev
 * Description: Collections of Gutenberg Block
 * Version: 0.0.1
 * Author: WeLabs
 * Author URI: https://welabs.dev
 * Text Domain: blocksuite
 * WC requires at least: 5.0.0
 * Domain Path: /languages/
 * Requires Plugins: 
 * License: GPL2
 */
use WeLabs\Blocksuite\Blocksuite;

// don't call the file directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! defined( 'BLOCKSUITE_FILE' ) ) {
    define( 'BLOCKSUITE_FILE', __FILE__ );
}

if ( ! defined( 'BLOCKSUITE_BASENAME' ) ) {
    define( 'BLOCKSUITE_BASENAME', plugin_basename( __FILE__ ) );
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Load Blocksuite Plugin when all plugins loaded
 *
 * @return \WeLabs\Blocksuite\Blocksuite
 */
function welabs_blocksuite() {
    return Blocksuite::init();
}

// Lets Go....
welabs_blocksuite();
