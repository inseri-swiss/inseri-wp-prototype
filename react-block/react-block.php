<?php
/**
 * Plugin Name:       React Block
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       react-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_react_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_react_block_block_init' );


function create_block_react_block_register_hydration() {

	$asset_file_hydration = include( plugin_dir_path( __FILE__ ) . 'build/hydration.asset.php');
	wp_enqueue_script(
		'create-block-react-block-scripts-hydration',
		plugins_url( 'build/hydration.js', __FILE__ ),
		$asset_file_hydration['dependencies'],
		$asset_file_hydration['version']
	);

}
add_action( 'wp_enqueue_scripts', 'create_block_react_block_register_hydration' );
