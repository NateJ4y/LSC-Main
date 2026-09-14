<?php
/**
 * Front page template.
 *
 * Elementor owns the page content. The theme owns global chrome, loading,
 * accessibility and the fallback presentation shown before the page is built.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>

<main id="primary" class="site-main">
	<?php if ( class_exists( '\Elementor\Plugin' ) && \Elementor\Plugin::$instance->documents->get_current() ) : ?>
		<div class="lsc-editor-content">
			<?php
			while ( have_posts() ) :
				the_post();
				the_content();
			endwhile;
			?>
		</div>
	<?php else : ?>
		<section class="lsc-hero" aria-labelledby="lsc-hero-title">
			<div class="lsc-hero__media" aria-hidden="true"></div>
			<div class="lsc-container lsc-hero__content">
				<p class="lsc-kicker">Lifestyle Seat Covers · Vereeniging, Gauteng</p>
				<h1 id="lsc-hero-title">Seat covers made for your vehicle.</h1>
				<p>Custom-fit, hard-wearing seat covers designed around your vehicle, your use and your style. Request a quote and let the workshop build the right fit.</p>
				<div class="lsc-actions">
					<a class="lsc-button" href="#quote">Get a quote</a>
					<a class="lsc-button lsc-button--ghost" href="#gallery">View real work</a>
				</div>
			</div>
		</section>

		<section id="gallery" class="lsc-section">
			<div class="lsc-container">
				<p class="lsc-kicker">Real workshop work</p>
				<h2 class="lsc-title">See what we make.</h2>
				<div class="lsc-editor-content" style="margin-top:28px">
					<p>Use Elementor to replace this fallback section with the existing workshop gallery and the supplied Lifestyle Seat Covers imagery.</p>
				</div>
			</div>
		</section>

		<section id="seat-covers" class="lsc-section lsc-section--tight">
			<div class="lsc-container">
				<p class="lsc-kicker">Built around the vehicle</p>
				<h2 class="lsc-title">Custom fit. Tough materials. Clean finish.</h2>
				<p class="lsc-copy">Keep the existing product-first messaging here, then use Elementor to place the exact product, material, embroidery and fitment content from the current site.</p>
			</div>
		</section>

		<section id="vehicles" class="lsc-section">
			<div class="lsc-container">
				<p class="lsc-kicker">Vehicle applications</p>
				<h2 class="lsc-title">Bakkies, SUVs, 4x4s and fleet vehicles.</h2>
			</div>
		</section>

		<section id="customise" class="lsc-section lsc-section--tight">
			<div class="lsc-container">
				<p class="lsc-kicker">Customisation</p>
				<h2 class="lsc-title">Choose the finish that fits you.</h2>
			</div>
		</section>

		<section id="quote" class="lsc-section">
			<div class="lsc-container">
				<p class="lsc-kicker">No public pricing</p>
				<h2 class="lsc-title">Get a custom quote.</h2>
				<p class="lsc-copy">Tell us your vehicle and requirements. We will confirm the correct fit, material and finish before providing your quote.</p>
				<a class="lsc-button" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Request a quote</a>
			</div>
		</section>
	<?php endif; ?>
</main>

<?php get_footer(); ?>
