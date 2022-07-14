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
function inseri_main_block_init() {
	register_block_type( __DIR__ . '/build' );

	$asset_file_inseri = include( plugin_dir_path( __FILE__ ) . 'build/inseri-core.asset.php');
	wp_register_script(
		'inseri-core',
		plugins_url( 'build/inseri-core.js', __FILE__ ),
		$asset_file_inseri['dependencies'],
		$asset_file_inseri['version']
	);
}
add_action( 'init', 'inseri_main_block_init' );

