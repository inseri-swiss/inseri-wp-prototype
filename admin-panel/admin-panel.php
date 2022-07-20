<?php
/**
 * Plugin Name:       Main Block
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       main-block
 *
 * @package           inseri
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

require_once(plugin_dir_path( __FILE__ ) . 'includes/rest-api.php');
require_once(plugin_dir_path( __FILE__ ) . 'includes/db.php');
register_activation_hook( __FILE__, 'inseri_create_plugin_tables' );


add_action( 'init', 'Inseri_Admin::register_ui_script');
add_action( 'admin_enqueue_scripts', 'Inseri_Admin::load_script' );
add_action( 'admin_menu', 'Inseri_Admin::add_menu' );

class Inseri_Admin {
	public static $script_name = 'inseri-admin-panel-scripts';

	public static function register_ui_script(){
		$asset_file = include plugin_dir_path( __FILE__ ) .  'build/index.asset.php';

		wp_register_script(
			Inseri_Admin::$script_name,
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}

	public static function load_script( $hook ){
		// Load only on ?page=inseri-admin-page.
		if ( 'toplevel_page_inseri-admin-page' !== $hook ) {
			return;
		}

		wp_localize_script( Inseri_Admin::$script_name, 'wpApiSettings', array(
			'root' => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' )
		) );

		wp_enqueue_script( Inseri_Admin::$script_name );
	}

	public static function add_menu(){
		add_menu_page(
			'Inseri Page',
			'Inseri',
			'manage_options',
			'inseri-admin-page',
			'Inseri_Admin::render_admin_content',
			'dashicons-schedule',
			3
		);
	}

	public static function render_admin_content(){
	?>
		<div id="inseri-root"></div>
	<?php
	}
}

