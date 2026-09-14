<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>
<main id="primary" class="site-main">
	<div class="lsc-container lsc-section lsc-editor-content">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<article <?php post_class( 'lsc-card' ); ?>>
					<div class="lsc-card__body">
						<p class="lsc-kicker"><?php echo esc_html( get_the_date() ); ?></p>
						<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<?php the_excerpt(); ?>
					</div>
				</article>
			<?php endwhile; ?>
		<?php else : ?>
			<h1 class="lsc-title">Nothing found.</h1>
		<?php endif; ?>
	</div>
</main>
<?php get_footer(); ?>
