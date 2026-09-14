<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lsc_enqueue_assets() {
	$theme_uri = get_template_directory_uri();
	$theme_dir = get_template_directory();

	wp_enqueue_style(
		'lsc-google-fonts',
		'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'lsc-theme',
		$theme_uri . '/style.css',
		array(),
		file_exists( $theme_dir . '/style.css' ) ? filemtime( $theme_dir . '/style.css' ) : '1.0.0'
	);

	wp_enqueue_script(
		'lsc-theme',
		$theme_uri . '/assets/js/theme.js',
		array(),
		file_exists( $theme_dir . '/assets/js/theme.js' ) ? filemtime( $theme_dir . '/assets/js/theme.js' ) : '1.0.0',
		true
	);
}
add_action( 'wp_enqueue_scripts', 'lsc_enqueue_assets' );

function lsc_preload_logo() {
	if ( ! has_custom_logo() ) {
		return;
	}

	$logo_id = get_theme_mod( 'custom_logo' );
	$logo_src = wp_get_attachment_image_url( $logo_id, 'full' );
	if ( $logo_src ) {
		echo '<link rel="preload" as="image" href="' . esc_url( $logo_src ) . '">' . "\n";
	}
}
add_action( 'wp_head', 'lsc_preload_logo', 1 );
