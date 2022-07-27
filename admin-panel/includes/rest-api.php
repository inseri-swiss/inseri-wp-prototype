<?php

add_action( 'rest_api_init', 'register_api_route' );
function register_api_route() {

	register_rest_route(
		'inseri/v1', '/datasources/', array(
			'methods'       => 'GET',
			'callback'      => 'get_all_datasources',
			'permission_callback' => '__return_true'
		)
	);

	register_rest_route(
		'inseri/v1', '/datasources/', array(
			'methods'       => 'POST',
			'callback'      => 'insert_datasource',
			'permission_callback' => '__return_true'
		)
	);

	register_rest_route(
		'inseri/v1', '/datasources/(?P<id>[\d]+)', array(
			'methods'       => 'DELETE',
			'callback'      => 'inseri_delete_route',
			'permission_callback' => '__return_true'
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

function inseri_delete_route( $request ) {
	$id = $request['id'];
	inseri_delete($id);
}

