<?php

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
