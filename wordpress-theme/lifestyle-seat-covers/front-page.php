<?php
/** Front page: Slider Revolution owns the hero; Elementor owns the remaining content. */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
$elementor_data = get_post_meta( get_the_ID(), '_elementor_data', true );
$has_elementor_content = ! empty( $elementor_data );
?>
<main id="primary" class="site-main">
	<?php get_template_part( 'template-parts/hero-slider-revolution' ); ?>
	<?php if ( $has_elementor_content ) : ?>
		<div class="lsc-editor-content">
			<?php while ( have_posts() ) : the_post(); the_content(); endwhile; ?>
		</div>
	<?php else : ?>
		<section id="gallery" class="lsc-section"><div class="lsc-container"><p class="lsc-kicker">Real workshop work</p><h2 class="lsc-title">See what we make.</h2><p class="lsc-copy">Build the gallery and remaining product-first sections in Elementor using the supplied Lifestyle Seat Covers imagery.</p></div></section>
		<section id="seat-covers" class="lsc-section lsc-section--tight"><div class="lsc-container"><p class="lsc-kicker">Built around the vehicle</p><h2 class="lsc-title">Custom fit. Tough materials. Clean finish.</h2></div></section>
		<section id="vehicles" class="lsc-section"><div class="lsc-container"><p class="lsc-kicker">Vehicle applications</p><h2 class="lsc-title">Bakkies, SUVs, 4x4s and fleet vehicles.</h2></div></section>
		<section id="customise" class="lsc-section lsc-section--tight"><div class="lsc-container"><p class="lsc-kicker">Customisation</p><h2 class="lsc-title">Choose the finish that fits you.</h2></div></section>
		<section id="quote" class="lsc-section"><div class="lsc-container"><p class="lsc-kicker">No public pricing</p><h2 class="lsc-title">Get a custom quote.</h2><p class="lsc-copy">Tell us your vehicle and requirements. We will confirm the correct fit, material and finish before providing your quote.</p><a class="lsc-button" href="#quote">Request a quote</a></div></section>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
