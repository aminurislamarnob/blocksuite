<?php

namespace WeLabs\Blocksuite;

/**
 * Blocksuite class
 *
 * @class Blocksuite The class that holds the entire Blocksuite plugin
 */
final class Blocksuite {

    /**
     * Plugin version
     *
     * @var string
     */
    public $version = '0.0.1';

    /**
     * Instance of self
     *
     * @var Blocksuite
     */
    private static $instance = null;

    /**
     * Holds various class instances
     *
     * @since 2.6.10
     *
     * @var array
     */
    private $container = [];

    /**
     * Constructor for the Blocksuite class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     */
    private function __construct() {
        $this->define_constants();

        register_activation_hook( BLOCKSUITE_FILE, [ $this, 'activate' ] );
        register_deactivation_hook( BLOCKSUITE_FILE, [ $this, 'deactivate' ] );

        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
        add_action( 'woocommerce_flush_rewrite_rules', [ $this, 'flush_rewrite_rules' ] );
        add_action( 'rest_api_init', [ $this, 'register_rest_route' ] );
    }

    /**
     * Initializes the Blocksuite() class
     *
     * Checks for an existing Blocksuite instance
     * and if it doesn't find one then create a new one.
     *
     * @return Blocksuite
     */
    public static function init() {
        if ( self::$instance === null ) {
			self::$instance = new self();
		}

        return self::$instance;
    }

    /**
     * Magic getter to bypass referencing objects
     *
     * @since 2.6.10
     *
     * @param string $prop
     *
     * @return Class Instance
     */
    public function __get( $prop ) {
		if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
		}
    }

    /**
     * Placeholder for activation function
     *
     * Nothing is being called here yet.
     */
    public function activate() {
        // Rewrite rules during blocksuite activation
        if ( $this->has_woocommerce() ) {
            $this->flush_rewrite_rules();
        }
    }

    /**
	 * Register plugin REST routes
	 *
	 * @return void
	 */
	public function register_rest_route() {
        // Register your REST routes here
	}

    /**
     * Flush rewrite rules after blocksuite is activated or woocommerce is activated
     *
     * @since 3.2.8
     */
    public function flush_rewrite_rules() {
        // fix rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate() {     }

    /**
     * Define all constants
     *
     * @return void
     */
    public function define_constants() {
        defined( 'BLOCKSUITE_PLUGIN_VERSION' ) || define( 'BLOCKSUITE_PLUGIN_VERSION', $this->version );
        defined( 'BLOCKSUITE_DIR' ) || define( 'BLOCKSUITE_DIR', dirname( BLOCKSUITE_FILE ) );
        defined( 'BLOCKSUITE_INC_DIR' ) || define( 'BLOCKSUITE_INC_DIR', BLOCKSUITE_DIR . '/includes' );
        defined( 'BLOCKSUITE_SRC_DIR' ) || define( 'BLOCKSUITE_SRC_DIR', BLOCKSUITE_DIR . '/src' );
        defined( 'BLOCKSUITE_BUILD_DIR' ) || define( 'BLOCKSUITE_BUILD_DIR', BLOCKSUITE_DIR . '/build' );
        defined( 'BLOCKSUITE_TEMPLATE_DIR' ) || define( 'BLOCKSUITE_TEMPLATE_DIR', BLOCKSUITE_DIR . '/templates' );
        defined( 'BLOCKSUITE_PLUGIN_ASSET' ) || define( 'BLOCKSUITE_PLUGIN_ASSET', plugins_url( 'assets', BLOCKSUITE_FILE ) );
        defined( 'BLOCKSUITE_PLUGIN_ADMIN_ASSET' ) || define( 'BLOCKSUITE_PLUGIN_ADMIN_ASSET' , BLOCKSUITE_PLUGIN_ASSET . '/admin' );
        defined( 'BLOCKSUITE_PLUGIN_PUBLIC_ASSET' ) || define( 'BLOCKSUITE_PLUGIN_PUBLIC_ASSET' , BLOCKSUITE_PLUGIN_ASSET . '/public' );

        // give a way to turn off loading styles and scripts from parent theme
        defined( 'BLOCKSUITE_LOAD_STYLE' ) || define( 'BLOCKSUITE_LOAD_STYLE', true );
        defined( 'BLOCKSUITE_LOAD_SCRIPTS' ) || define( 'BLOCKSUITE_LOAD_SCRIPTS', true );
    }

    /**
     * Load the plugin after WP User Frontend is loaded
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();

        do_action( 'blocksuite_loaded' );
    }

    /**
     * Initialize the actions
     *
     * @return void
     */
    public function init_hooks() {
        // initialize the classes
        add_action( 'init', [ $this, 'init_classes' ], 4 );
        add_action( 'plugins_loaded', [ $this, 'after_plugins_loaded' ] );
    }

    /**
     * Include all the required files
     *
     * @return void
     */
    public function includes() {
        // include_once STUB_PLUGIN_DIR . '/functions.php';
    }

    /**
     * Init all the classes
     *
     * @return void
     */
    public function init_classes() {
        $this->container['blocks'] = new BlockManager();
    }

    /**
     * Executed after all plugins are loaded
     *
     * At this point blocksuite Pro is loaded
     *
     * @since 2.8.7
     *
     * @return void
     */
    public function after_plugins_loaded() {
        // Initiate background processes and other tasks
    }

    /**
     * Check whether woocommerce is installed and active
     *
     * @since 2.9.16
     *
     * @return bool
     */
    public function has_woocommerce() {
        return class_exists( 'WooCommerce' );
    }

    /**
     * Check whether woocommerce is installed
     *
     * @since 3.2.8
     *
     * @return bool
     */
    public function is_woocommerce_installed() {
        return in_array( 'woocommerce/woocommerce.php', array_keys( get_plugins() ), true );
    }

    /**
	 * Get the plugin url.
	 *
	 * @return string
	 */
	public function plugin_url() {
		return untrailingslashit( plugins_url( '/', BLOCKSUITE_FILE ) );
	}

    /**
     * Get the template file path to require or include.
     *
     * @param string $name
     * @return string
     */
    public function get_template_path( $name ) {
        $template = untrailingslashit( BLOCKSUITE_TEMPLATE_DIR ) . '/' . untrailingslashit( $name );

        return apply_filters( 'blocksuite_template', $template, $name );
    }

    /**
     * Get templates passing attributes and including the file.
     * You can use this method to load php template file by following:
     * Example-1: welabs_blocksuite()->get_template( 'admin/custom-meta-fields.php' );
     * Example-2: welabs_blocksuite()->get_template( 'admin/custom-meta-fields.php', [
			'loop' => $loop,
			'variation_data' => $variation_data,
			'variation' => $variation
		] );
     * 
     * @param mixed  $template_name
     * @param array  $args          (default: array())
     * @param string $template_path (default: '')
     * @param string $default_path  (default: '')
     *
     * @return void
     */
    function get_template( $template_name, $args = [] ) {
        if ( $args && is_array( $args ) ) {
            extract( $args ); // phpcs:ignore
        }

        $template_path = $this->get_template_path( $template_name );

        if ( ! file_exists( $template_path ) ) {
            _doing_it_wrong( __FUNCTION__, sprintf( '<code>%s</code> does not exist.', esc_html( $template_path ) ), BLOCKSUITE_PLUGIN_VERSION );

            return;
        }

        do_action( 'blocksuite_before_template_part', $template_name, $args );

        include $this->get_template_path( $template_name );

        do_action( 'blocksuite_after_template_part', $template_name, $args );
    }
}
