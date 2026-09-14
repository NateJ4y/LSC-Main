<?php
if ( ! defined( 'ABSPATH' ) ) exit;

function lsc_default_image_url( $filename ) {
	return 'https://raw.githubusercontent.com/NateJ4y/LSC-Main/wordpress-elementor-conversion/public/images/' . rawurlencode( $filename );
}

add_action( 'elementor/widgets/register', function( $widgets_manager ) {
	if ( ! class_exists( '\\Elementor\\Widget_Base' ) ) return;

	class LSC_Workshop_Gallery_Widget extends \\Elementor\\Widget_Base {
		public function get_name() { return 'lsc-workshop-gallery'; }
		public function get_title() { return 'LSC Workshop Gallery'; }
		public function get_icon() { return 'eicon-gallery-grid'; }
		public function get_categories() { return array( 'basic' ); }
		protected function register_controls() {
			$this->start_controls_section( 'content', array( 'label' => 'Gallery Content' ) );
			$this->add_control( 'eyebrow', array( 'label'=>'Eyebrow','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'REAL WORKSHOP WORK' ) );
			$this->add_control( 'heading', array( 'label'=>'Heading','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'See what we make.' ) );
			$this->add_control( 'intro', array( 'label'=>'Intro','type'=>\\Elementor\\Controls_Manager::TEXTAREA,'default'=>'Real Lifestyle Seat Covers fitments, finishes and workshop work. No stock mockups.' ) );
			$repeater = new \\Elementor\\Repeater();
			$repeater->add_control( 'image', array( 'label'=>'Image','type'=>\\Elementor\\Controls_Manager::MEDIA ) );
			$repeater->add_control( 'title', array( 'label'=>'Title','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'Custom fitment' ) );
			$repeater->add_control( 'vehicle', array( 'label'=>'Vehicle','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'Toyota Hilux' ) );
			$repeater->add_control( 'category', array( 'label'=>'Category','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'Bakkies & 4x4' ) );
			$this->add_control( 'items', array( 'label'=>'Workshop images','type'=>\\Elementor\\Controls_Manager::REPEATER,'fields'=>$repeater->get_controls(),'default'=>array(
				array('title'=>'Custom Hilux fitment','vehicle'=>'Toyota Hilux','category'=>'Bakkies & 4x4'),
				array('title'=>'Land Cruiser finish','vehicle'=>'Toyota Land Cruiser','category'=>'4x4'),
				array('title'=>'Rugged canvas fitment','vehicle'=>'Ford Ranger','category'=>'Bakkies'),
				array('title'=>'Premium interior finish','vehicle'=>'VW Amarok','category'=>'Interior'),
				array('title'=>'Custom SUV fitment','vehicle'=>'Toyota Fortuner','category'=>'SUV'),
				array('title'=>'Detailed stitching','vehicle'=>'Custom workshop fitment','category'=>'Craftsmanship'),
			),'title_field'=>'{{{ vehicle }}}' ) );
			$this->end_controls_section();
		}
		protected function render() {
			$s=$this->get_settings_for_display();
			$f=array('WhatsApp Image 2026-08-31 at 8.08.53 AM.jpeg','WhatsApp Image 2026-08-31 at 8.08.54 AM.jpeg','WhatsApp Image 2026-08-31 at 8.08.55 AM (1).jpeg','WhatsApp Image 2026-08-31 at 8.08.55 AM (2).jpeg','WhatsApp Image 2026-08-31 at 8.08.55 AM.jpeg','WhatsApp Image 2026-08-31 at 8.08.56 AM.jpeg');
			echo '<section class="lsc-el-section lsc-gallery"><div class="lsc-el-container"><div class="lsc-section-head"><span>'.esc_html($s['eyebrow']).'</span><h2>'.esc_html($s['heading']).'</h2><p>'.esc_html($s['intro']).'</p></div><div class="lsc-gallery-grid">';
			foreach($s['items'] as $i=>$item){$url=!empty($item['image']['url'])?$item['image']['url']:lsc_default_image_url($f[$i%count($f)]);echo '<article class="lsc-gallery-card"><img src="'.esc_url($url).'" alt="'.esc_attr($item['title']).'" loading="lazy"><div class="lsc-gallery-meta"><span>'.esc_html($item['category']).'</span><h3>'.esc_html($item['title']).'</h3><p>'.esc_html($item['vehicle']).'</p></div></article>';}
			echo '</div></div></section>';
		}
	}

	class LSC_Applications_Widget extends \\Elementor\\Widget_Base {
		public function get_name(){return 'lsc-applications';} public function get_title(){return 'LSC Vehicle Applications';} public function get_icon(){return 'eicon-car';} public function get_categories(){return array('basic');}
		protected function register_controls(){
			$this->start_controls_section('content',array('label'=>'Applications'));
			$this->add_control('eyebrow',array('label'=>'Eyebrow','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'TAILORED FOR SOUTH AFRICAN VEHICLES'));
			$this->add_control('heading',array('label'=>'Heading','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'Vehicle applications & sector specialisms'));
			$this->add_control('intro',array('label'=>'Intro','type'=>\\Elementor\\Controls_Manager::TEXTAREA,'default'=>'From daily drivers and SUVs to bakkies, fleets and rugged work vehicles, every cover is built around the vehicle.'));
			$rep=new \\Elementor\\Repeater();
			foreach(array('title','headline','description','material') as $field)$rep->add_control($field,array('label'=>ucwords($field),'type'=>$field==='description'?\\Elementor\\Controls_Manager::TEXTAREA:\\Elementor\\Controls_Manager::TEXT,'default'=>ucwords(str_replace('_',' ',$field))));
			$rep->add_control('models',array('label'=>'Popular models (one per line)','type'=>\\Elementor\\Controls_Manager::TEXTAREA,'default'=>"Toyota Hilux\nFord Ranger\nToyota Land Cruiser"));
			$this->add_control('items',array('label'=>'Vehicle sectors','type'=>\\Elementor\\Controls_Manager::REPEATER,'fields'=>$rep->get_controls(),'default'=>array(
				array('title'=>'4x4 & Bakkies','headline'=>'Built for adventure and hard work','description'=>'Rugged, precision-fit protection for South Africa’s most demanding bakkies and 4x4s.','material'=>'510g Heavy-Duty Ripstop Canvas','models'=>"Toyota Hilux\nFord Ranger\nToyota Land Cruiser\nIsuzu D-Max"),
				array('title'=>'Daily Drivers & SUVs','headline'=>'Family defense with executive comfort','description'=>'Protect original upholstery from everyday wear, kids, work gear and travel.','material'=>'Automotive-grade canvas and premium finishes','models'=>"Toyota Fortuner\nToyota Prado\nVW Tiguan\nToyota Corolla Cross"),
				array('title'=>'Trucks & Fleets','headline'=>'Commercial vehicle asset protection','description'=>'Durable, easy-clean covers for high-cycle commercial and fleet environments.','material'=>'Heavy-duty canvas','models'=>"Hino\nIsuzu NPR / NQR\nToyota Quantum\nMercedes-Benz Sprinter"),
			),'title_field'=>'{{{ title }}}'));
			$this->end_controls_section();
		}
		protected function render(){ $s=$this->get_settings_for_display(); echo '<section class="lsc-el-section lsc-applications"><div class="lsc-el-container"><div class="lsc-section-head"><span>'.esc_html($s['eyebrow']).'</span><h2>'.esc_html($s['heading']).'</h2><p>'.esc_html($s['intro']).'</p></div><div class="lsc-application-grid">'; foreach($s['items'] as $item){echo '<article class="lsc-application-card"><span class="lsc-card-tag">'.esc_html($item['title']).'</span><h3>'.esc_html($item['headline']).'</h3><p>'.esc_html($item['description']).'</p><div class="lsc-material"><strong>Recommended:</strong> '.esc_html($item['material']).'</div><ul>';foreach(preg_split('/\r\n|\r|\n/',$item['models']) as $model)if(trim($model))echo '<li>'.esc_html(trim($model)).'</li>';echo '</ul><a class="lsc-el-button" href="#quote">Get a quote</a></article>';}echo '</div></div></section>'; }
	}

	class LSC_Craftsmanship_Widget extends \\Elementor\\Widget_Base {
		public function get_name(){return 'lsc-craftsmanship';} public function get_title(){return 'LSC Craftsmanship';} public function get_icon(){return 'eicon-featured-image';} public function get_categories(){return array('basic');}
		protected function register_controls(){
			$this->start_controls_section('content',array('label'=>'Craftsmanship'));
			$this->add_control('eyebrow',array('label'=>'Eyebrow','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'MATERIALS • STITCHING • EMBROIDERY'));
			$this->add_control('heading',array('label'=>'Heading','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'Built properly. Finished properly.'));
			$rep=new \\Elementor\\Repeater();$rep->add_control('image',array('label'=>'Image','type'=>\\Elementor\\Controls_Manager::MEDIA));$rep->add_control('title',array('label'=>'Title','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'Heavy-duty materials'));$rep->add_control('text',array('label'=>'Description','type'=>\\Elementor\\Controls_Manager::TEXTAREA,'default'=>'Purpose-selected materials with a clean, durable finish.'));
			$this->add_control('items',array('label'=>'Craftsmanship cards','type'=>\\Elementor\\Controls_Manager::REPEATER,'fields'=>$rep->get_controls(),'default'=>array(array('title'=>'510g Heavy-Duty Canvas','text'=>'Rugged protection for demanding daily use.'),array('title'=>'Diamond Quilting','text'=>'Structured padding and a premium visual finish.'),array('title'=>'Custom Embroidery','text'=>'Brand logos, names and custom text when required.'),array('title'=>'Precision Stitching','text'=>'Contoured seams and reinforced construction.')),'title_field'=>'{{{ title }}}'));
			$this->end_controls_section();
		}
		protected function render(){ $s=$this->get_settings_for_display();$f=array('WhatsApp Image 2026-08-31 at 8.08.55 AM.jpeg','WhatsApp Image 2026-08-31 at 8.08.56 AM (1).jpeg','WhatsApp Image 2026-08-31 at 8.08.57 AM (1).jpeg','WhatsApp Image 2026-08-31 at 8.08.55 AM (2).jpeg');echo '<section class="lsc-el-section lsc-craft"><div class="lsc-el-container"><div class="lsc-section-head"><span>'.esc_html($s['eyebrow']).'</span><h2>'.esc_html($s['heading']).'</h2></div><div class="lsc-craft-grid">';foreach($s['items'] as $i=>$item){$url=!empty($item['image']['url'])?$item['image']['url']:lsc_default_image_url($f[$i%count($f)]);echo '<article class="lsc-craft-card"><img src="'.esc_url($url).'" alt="'.esc_attr($item['title']).'" loading="lazy"><div><h3>'.esc_html($item['title']).'</h3><p>'.esc_html($item['text']).'</p></div></article>';}echo '</div></div></section>'; }
	}

	class LSC_Quote_Widget extends \\Elementor\\Widget_Base {
		public function get_name(){return 'lsc-quote-cta';} public function get_title(){return 'LSC Quote CTA';} public function get_icon(){return 'eicon-button';} public function get_categories(){return array('basic');}
		protected function register_controls(){ $this->start_controls_section('content',array('label'=>'Quote CTA'));$this->add_control('eyebrow',array('label'=>'Eyebrow','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'CUSTOM QUOTE'));$this->add_control('heading',array('label'=>'Heading','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'Tell us what you drive. We’ll take it from there.'));$this->add_control('copy',array('label'=>'Copy','type'=>\\Elementor\\Controls_Manager::TEXTAREA,'default'=>'Send your vehicle details and requirements. We’ll confirm the fit, material and finish before providing your quote.'));$this->add_control('button_text',array('label'=>'Button','type'=>\\Elementor\\Controls_Manager::TEXT,'default'=>'Request a quote'));$this->add_control('button_link',array('label'=>'Button link','type'=>\\Elementor\\Controls_Manager::URL,'default'=>array('url'=>'#quote')));$this->end_controls_section(); }
		protected function render(){ $s=$this->get_settings_for_display();$target=!empty($s['button_link']['url'])?$s['button_link']['url']:'#quote';echo '<section id="quote" class="lsc-el-section lsc-quote"><div class="lsc-el-container"><span>'.esc_html($s['eyebrow']).'</span><h2>'.esc_html($s['heading']).'</h2><p>'.esc_html($s['copy']).'</p><a class="lsc-el-button lsc-el-button--light" href="'.esc_url($target).'">'.esc_html($s['button_text']).'</a></div></section>'; }
	}

	$widgets_manager->register( new LSC_Workshop_Gallery_Widget() );
	$widgets_manager->register( new LSC_Applications_Widget() );
	$widgets_manager->register( new LSC_Craftsmanship_Widget() );
	$widgets_manager->register( new LSC_Quote_Widget() );
});
