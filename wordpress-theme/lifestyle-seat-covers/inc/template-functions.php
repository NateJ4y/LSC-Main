<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lsc_site_logo() {
	if ( has_custom_logo() ) {
		the_custom_logo();
		return;
	}

	echo '<a class="lsc-brand" href="' . esc_url( home_url( '/' ) ) . '" rel="home">';
	echo '<span aria-label="' . esc_attr( get_bloginfo( 'name' ) ) . '">' . esc_html( get_bloginfo( 'name' ) ) . '</span>';
	echo '</a>';
}

function lsc_primary_menu_fallback() {
	$links = array(
		'Gallery'    => '#gallery',
		'Seat Covers' => '#seat-covers',
		'Vehicles'   => '#vehicles',
		'Customise'  => '#customise',
		'Contact'    => '#contact',
	);

	foreach ( $links as $label => $href ) {
		echo '<a href="' . esc_url( home_url( '/' ) . $href ) . '">' . esc_html( $label ) . '</a>';
	}
}

function lsc_get_page_image( $size = 'large' ) {
	if ( has_post_thumbnail() ) {
		return get_the_post_thumbnail_url( get_the_ID(), $size );
	}
	return '';
}
