<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="lsc-site-header">
	<div class="lsc-container lsc-header-inner">
		<div class="lsc-brand-wrap">
			<?php lsc_site_logo(); ?>
		</div>
		<nav class="lsc-nav" aria-label="Primary navigation">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu( array(
					'theme_location' => 'primary',
					'container'      => false,
					'items_wrap'     => '%3$s',
				) );
			} else {
				lsc_primary_menu_fallback();
			}
			?>
		</nav>
		<a class="lsc-button" href="<?php echo esc_url( home_url( '/#quote' ) ); ?>">Get a quote</a>
	</div>
</header>
