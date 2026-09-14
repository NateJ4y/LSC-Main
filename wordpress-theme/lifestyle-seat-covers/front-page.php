<?php
/** Front page: Slider Revolution owns the hero; Elementor owns the remaining sections. */
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
		<section id="gallery" class="lsc-el-section lsc-gallery">
			<div class="lsc-el-container">
				<div class="lsc-section-head"><span>REAL WORKSHOP WORK</span><h2>See what we make.</h2><p>Real Lifestyle Seat Covers fitments, finishes and workshop work. No stock mockups.</p></div>
				<div class="lsc-gallery-grid">
					<?php
					$fallbacks = array(
						array('WhatsApp Image 2026-08-31 at 8.08.53 AM.jpeg','Custom Hilux fitment','Toyota Hilux','Bakkies & 4x4'),
						array('WhatsApp Image 2026-08-31 at 8.08.54 AM.jpeg','Land Cruiser finish','Toyota Land Cruiser','4x4'),
						array('WhatsApp Image 2026-08-31 at 8.08.55 AM (1).jpeg','Rugged canvas fitment','Ford Ranger','Bakkies'),
						array('WhatsApp Image 2026-08-31 at 8.08.55 AM (2).jpeg','Premium interior finish','VW Amarok','Interior'),
						array('WhatsApp Image 2026-08-31 at 8.08.55 AM.jpeg','Custom SUV fitment','Toyota Fortuner','SUV'),
						array('WhatsApp Image 2026-08-31 at 8.08.56 AM.jpeg','Detailed stitching','Custom workshop fitment','Craftsmanship'),
					);
					foreach ( $fallbacks as $card ) :
						$url = 'https://raw.githubusercontent.com/NateJ4y/LSC-Main/wordpress-elementor-conversion/public/images/' . rawurlencode( $card[0] );
						?>
						<article class="lsc-gallery-card"><img src="<?php echo esc_url( $url ); ?>" alt="<?php echo esc_attr( $card[1] ); ?>" loading="lazy"><div class="lsc-gallery-meta"><span><?php echo esc_html( $card[3] ); ?></span><h3><?php echo esc_html( $card[1] ); ?></h3><p><?php echo esc_html( $card[2] ); ?></p></div></article>
					<?php endforeach; ?>
				</div>
			</div>
		</section>

		<section id="seat-covers" class="lsc-el-section lsc-craft"><div class="lsc-el-container"><div class="lsc-section-head"><span>MATERIALS • STITCHING • EMBROIDERY</span><h2>Built properly. Finished properly.</h2></div><div class="lsc-craft-grid"><article class="lsc-craft-card"><div class="lsc-craft-placeholder"><strong>510g Heavy-Duty Canvas</strong><p>Rugged protection for demanding daily use.</p></div></article><article class="lsc-craft-card"><div class="lsc-craft-placeholder"><strong>Diamond Quilting</strong><p>Structured padding and a premium visual finish.</p></div></article><article class="lsc-craft-card"><div class="lsc-craft-placeholder"><strong>Custom Embroidery</strong><p>Brand logos, names and custom text when required.</p></div></article><article class="lsc-craft-card"><div class="lsc-craft-placeholder"><strong>Precision Stitching</strong><p>Contoured seams and reinforced construction.</p></div></article></div></div></section>

		<section id="vehicles" class="lsc-el-section lsc-applications"><div class="lsc-el-container"><div class="lsc-section-head"><span>TAILORED FOR SOUTH AFRICAN VEHICLES</span><h2>Vehicle applications & sector specialisms</h2><p>From daily drivers and SUVs to bakkies, fleets and rugged work vehicles, every cover is built around the vehicle.</p></div><div class="lsc-application-grid"><article class="lsc-application-card"><span class="lsc-card-tag">4x4 & Bakkies</span><h3>Built for adventure and hard work</h3><p>Rugged, precision-fit protection for demanding bakkies and 4x4s.</p><div class="lsc-material"><strong>Recommended:</strong> 510g Heavy-Duty Ripstop Canvas</div><ul><li>Toyota Hilux</li><li>Ford Ranger</li><li>Toyota Land Cruiser</li><li>Isuzu D-Max</li></ul><a class="lsc-el-button" href="#quote">Get a quote</a></article><article class="lsc-application-card"><span class="lsc-card-tag">Daily Drivers & SUVs</span><h3>Family defense with executive comfort</h3><p>Protect original upholstery from everyday wear, kids, work gear and travel.</p><div class="lsc-material"><strong>Recommended:</strong> Automotive-grade canvas and premium finishes</div><ul><li>Toyota Fortuner</li><li>Toyota Prado</li><li>VW Tiguan</li><li>Toyota Corolla Cross</li></ul><a class="lsc-el-button" href="#quote">Get a quote</a></article><article class="lsc-application-card"><span class="lsc-card-tag">Trucks & Fleets</span><h3>Commercial vehicle asset protection</h3><p>Durable, easy-clean covers for high-cycle commercial and fleet environments.</p><div class="lsc-material"><strong>Recommended:</strong> Heavy-duty canvas</div><ul><li>Hino</li><li>Isuzu NPR / NQR</li><li>Toyota Quantum</li><li>Mercedes-Benz Sprinter</li></ul><a class="lsc-el-button" href="#quote">Get a quote</a></article></div></div></section>

		<section id="quote" class="lsc-el-section lsc-quote"><div class="lsc-el-container"><span>CUSTOM QUOTE</span><h2>Tell us what you drive. We’ll take it from there.</h2><p>Send your vehicle details and requirements. We’ll confirm the fit, material and finish before providing your quote.</p><a class="lsc-el-button lsc-el-button--light" href="#quote">Request a quote</a></div></section>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
