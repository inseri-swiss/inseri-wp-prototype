<?php

add_filter( 'render_block_core/image', 'inseri_add_attributes', 10, 2 );

function inseri_add_attributes( $block_content, $block ) {
    if ( isset( $block['attrs']['inseri-foo'] ) ) {
		$val = json_encode($block['attrs']['inseri-foo']);
		return str_replace('<img', '<img data-foo='. esc_attr($val), $block_content);
    }

    return $block_content;
}
