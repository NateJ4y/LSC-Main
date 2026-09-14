<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
<footer class="lsc-footer">
	<div class="lsc-container lsc-footer__inner">
		<div>
			<?php lsc_site_logo(); ?>
			<p>Custom seat covers built for real vehicles, real work and real South African conditions.</p>
		</div>
		<div>
			<p class="lsc-kicker">Navigate</p>
			<?php
			if ( has_nav_menu( 'footer' ) ) {
				wp_nav_menu( array( 'theme_location' => 'footer', 'container' => false ) );
			} else {
				echo '<ul><li><a href="' . esc_url( home_url( '/#gallery' ) ) . '">Gallery</a></li><li><a href="' . esc_url( home_url( '/#vehicles' ) ) . '">Vehicles</a></li><li><a href="' . esc_url( home_url( '/#quote' ) ) . '">Get a quote</a></li></ul>';
			}
			?>
		</div>
		<div id="contact">
			<p class="lsc-kicker">Contact</p>
			<p><a href="mailto:info@lifestyleseatcovers.co.za">info@lifestyleseatcovers.co.za</a></p>
			<p>Vereeniging, Gauteng</p>
		</div>
	</div>
	<div class="lsc-container lsc-footer__bottom">
		<?php echo esc_html( '© ' . wp_date( 'Y' ) . ' Lifestyle Seat Covers. All rights reserved.' ); ?>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
