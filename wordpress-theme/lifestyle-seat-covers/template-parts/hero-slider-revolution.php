<?php
/**
 * Slider Revolution hero mount point.
 *
 * Slider Revolution remains the owner of the hero slides, imagery, text,
 * buttons, transitions and responsive positioning. The theme deliberately
 * does not hard-code hero slides here so they remain editable in the
 * Slider Revolution editor.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
<section class="lsc-hero lsc-hero--slider-revolution" aria-label="Lifestyle Seat Covers hero">
	<?php
	if ( function_exists( 'rev_slider' ) ) {
		// Replace this alias with the Slider Revolution module alias created
		// on the production WordPress installation if it differs.
		rev_slider( 'lifestyle-hero' );
	} else {
		?>
		<div class="lsc-hero__fallback">
			<div class="lsc-container">
				<p class="lsc-kicker">Lifestyle Seat Covers · Vereeniging, Gauteng</p>
				<h1>Custom seat covers made for your vehicle.</h1>
				<p>Premium custom-fit seat covers, built around your vehicle and your requirements.</p>
				<a class="lsc-button" href="#quote">Get a quote</a>
			</div>
		</div>
		<?php
	}
	?>
</section>
