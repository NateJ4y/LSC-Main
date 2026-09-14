<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lsc_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array(
		'height'      => 160,
		'width'       => 640,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-background', array( 'default-color' => '0c0c0e' ) );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );

	register_nav_menus( array(
		'primary' => __( 'Primary Navigation', 'lifestyle-seat-covers' ),
		'footer'  => __( 'Footer Navigation', 'lifestyle-seat-covers' ),
	) );
}
add_action( 'after_setup_theme', 'lsc_theme_setup' );

function lsc_content_width() {
	$GLOBALS['content_width'] = 1240;
}
add_action( 'after_setup_theme', 'lsc_content_width', 0 );
