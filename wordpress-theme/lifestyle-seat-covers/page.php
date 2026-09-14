<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>
<main id="primary" class="site-main">
	<div class="lsc-container lsc-section lsc-editor-content">
		<?php
		while ( have_posts() ) :
			the_post();
			the_title( '<h1 class="lsc-title">', '</h1>' );
			the_content();
		endwhile;
		?>
	</div>
</main>
<?php get_footer(); ?>
