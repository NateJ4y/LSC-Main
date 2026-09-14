<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>
<main id="primary" class="site-main">
	<div class="lsc-container lsc-section">
		<header class="lsc-section--tight">
			<p class="lsc-kicker">Lifestyle Seat Covers</p>
			<h1 class="lsc-title"><?php the_archive_title(); ?></h1>
		</header>
		<div class="lsc-grid lsc-grid--3">
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
				<article <?php post_class( 'lsc-card' ); ?>>
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="lsc-card__media"><?php the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); ?></div>
					<?php endif; ?>
					<div class="lsc-card__body">
						<p class="lsc-kicker"><?php echo esc_html( get_the_date() ); ?></p>
						<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<?php the_excerpt(); ?>
					</div>
				</article>
			<?php endwhile; else : ?>
				<p>No content found.</p>
			<?php endif; ?>
		</div>
	</div>
</main>
<?php get_footer(); ?>
