<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lsc_elementor_theme_support() {
	add_theme_support( 'elementor' );
}
add_action( 'after_setup_theme', 'lsc_elementor_theme_support' );

function lsc_register_elementor_locations( $manager ) {
	$manager->register_all_core_location();
}
add_action( 'elementor/theme/register_locations', 'lsc_register_elementor_locations' );

function lsc_elementor_content_wrapper_start() {
	if ( class_exists( '\\Elementor\\Plugin' ) && \\Elementor\\Plugin::$instance->editor->is_edit_mode() ) {
		echo '<main id="primary" class="lsc-editor-content lsc-elementor-editing">';
	}
}

function lsc_elementor_content_wrapper_end() {
	if ( class_exists( '\\Elementor\\Plugin' ) && \\Elementor\\Plugin::$instance->editor->is_edit_mode() ) {
		echo '</main>';
	}
}

// Register the actual React-to-Elementor section equivalents.
require_once get_template_directory() . '/inc/elementor-widgets.php';
