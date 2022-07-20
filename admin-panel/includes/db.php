<?php

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
