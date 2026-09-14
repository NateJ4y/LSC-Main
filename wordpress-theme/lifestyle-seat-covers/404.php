<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>
<main id="primary" class="site-main">
	<section class="lsc-section">
		<div class="lsc-container">
			<p class="lsc-kicker">404</p>
			<h1 class="lsc-title">That page is not here.</h1>
			<p class="lsc-copy">Return to the Lifestyle Seat Covers homepage or request a quote.</p>
			<a class="lsc-button" href="<?php echo esc_url( home_url( '/' ) ); ?>">Back to home</a>
		</div>
	</section>
</main>
<?php get_footer(); ?>
