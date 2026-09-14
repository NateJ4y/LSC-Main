# Lifestyle Seat Covers — WordPress / Elementor theme

This directory is an isolated WordPress theme conversion on the `wordpress-elementor-conversion` branch. The original React/Vite application on `main` is not modified by this theme.

## Architecture

- `style.css` — global visual system matching the existing dark, premium aesthetic.
- `functions.php` — theme bootstrap.
- `inc/setup.php` — WordPress supports, menus and content width.
- `inc/enqueue.php` — versioned CSS/JS loading and logo preload.
- `inc/elementor.php` — Elementor theme support and theme-location registration.
- `inc/template-functions.php` — reusable header/navigation helpers.
- `front-page.php` — product-first homepage with an Elementor content path and safe fallback.
- `page.php`, `single.php`, `archive.php`, `index.php`, `404.php` — standard WordPress templates.
- `theme.json` — editor design tokens.
- `assets/js/theme.js` — lightweight anchor navigation only.

## Elementor editing model

The homepage is intentionally built around WordPress `the_content()`. Once Elementor is installed and the homepage is opened with Elementor, the page's Elementor layout becomes the editable main content area. The theme retains responsibility for global header, footer, typography defaults, asset loading, responsive behavior and WordPress integration.

For the final content migration, recreate the existing React sections as Elementor Containers/Widgets and upload the supplied workshop/logo assets to the WordPress Media Library. Do not hotlink the Vercel site or the GitHub repository in production.

## Production deployment

1. Zip the `wordpress-theme/lifestyle-seat-covers` directory.
2. Install it through WordPress > Appearance > Themes.
3. Activate the theme.
4. Install/activate Elementor.
5. Set a static homepage under Settings > Reading.
6. Edit that homepage with Elementor and build the migrated sections inside the page content area.
7. Set the supplied Lifestyle Seat Covers logo as the WordPress Custom Logo.
8. Upload the supplied workshop photography to Media Library and use the original files without filters or generative alteration.
9. Configure menus under Appearance > Menus.
10. Configure caching/CDN only after verifying the page and Elementor editor on desktop and mobile.

## Important conversion boundary

This branch contains the production WordPress theme foundation and Elementor integration. It does **not** pretend that React/TypeScript components can be executed directly by WordPress/PHP. The existing React application remains the source reference on `main`; the visual/content migration into Elementor must be performed as WordPress content/templates rather than by embedding the React application.
