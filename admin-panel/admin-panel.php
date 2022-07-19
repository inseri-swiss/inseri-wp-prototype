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

add_action( 'init', function() {
	// Automatically load dependencies and version.
	$asset_file = include plugin_dir_path( __FILE__ ) .  'build/index.asset.php';

	wp_register_script(
		'inseri-admin-panel-scripts',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
} );


function load_my_plugin_scripts( $hook ) {
	// Load only on ?page=inseri-admin-page.
	if ( 'toplevel_page_inseri-admin-page' !== $hook ) {
		return;
	}

	wp_localize_script( 'inseri-admin-panel-scripts', 'wpApiSettings', array(
		'root' => esc_url_raw( rest_url() ),
		'nonce' => wp_create_nonce( 'wp_rest' )
	) );

	wp_enqueue_script( 'inseri-admin-panel-scripts' );

}

add_action( 'admin_enqueue_scripts', 'load_my_plugin_scripts' );


function my_admin_menu() {
	add_menu_page(
		'Inseri Page',
		'Inseri',
		'manage_options',
		'inseri-admin-page',
		'my_admin_page_contents',
		'dashicons-schedule',
		3
	);
}

add_action( 'admin_menu', 'my_admin_menu' );



function my_admin_page_contents() {
	?>
		<div id="inseri-root"></div>
	<?php
}

/**
 * REST API
 */

add_action( 'rest_api_init', 'register_api_route' );
function register_api_route() {

	register_rest_route(
		'inseri/v1', '/datasources/', array(
			'methods'       => 'WP_REST_Server::READABLE',
			'callback'      => 'get_all_datasources',
		)
	);

	register_rest_route(
		'inseri/v1', '/datasources/', array(
			'methods'       => 'POST',
			'callback'      => 'insert_datasource',
		)
	);

}

function insert_datasource( $request ) {
	$body = $request->get_json_params();
	inseri_insert($body);
	return $body;
}

function get_all_datasources( $request ) {
	return inseri_get_all();
}



/**
 * DB tables
 */
function inseri_create_plugin_tables()
{
    global $wpdb;

    $table_name = $wpdb->prefix . 'inseri_datasources';
	$charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
      id int(11) NOT NULL AUTO_INCREMENT,
      name varchar(255) DEFAULT NULL,
      url varchar(255) DEFAULT NULL,
      UNIQUE KEY id (id)
    ) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}
register_activation_hook( __FILE__, 'inseri_create_plugin_tables' );


function inseri_get_all( )
{
    global $wpdb;

    $table_name = $wpdb->prefix . 'inseri_datasources';

    $results = $wpdb->get_results('SELECT * FROM '.$table_name);
    return $results;
}

function inseri_insert($item)
{
    global $wpdb;
	$table_name = $wpdb->prefix . 'inseri_datasources';
    $wpdb->insert($table_name, $item, array('%s','%s'));
}
