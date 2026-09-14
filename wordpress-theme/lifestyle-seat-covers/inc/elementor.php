<?php
if ( ! defined('ABSPATH') ) exit;
function lsc_elementor_theme_support(){add_theme_support('elementor');}
add_action('after_setup_theme','lsc_elementor_theme_support');
function lsc_register_elementor_locations($manager){$manager->register_all_core_location();}
add_action('elementor/theme/register_locations','lsc_register_elementor_locations');
require_once get_template_directory().'/inc/elementor-widgets.php';

/** Seed a real editable Elementor homepage once, without overwriting existing content. */
function lsc_seed_elementor_homepage(){
 $front=(int)get_option('page_on_front'); if(!$front || get_post_meta($front,'_elementor_data',true)) return;
 $elements=array();
 foreach(array('lsc-workshop-gallery','lsc-craftsmanship','lsc-applications','lsc-quote-cta') as $type){$elements[]=array('id'=>substr(md5($type),0,7),'elType'=>'widget','widgetType'=>$type,'settings'=>array(),'elements'=>array());}
 update_post_meta($front,'_elementor_data',wp_slash(wp_json_encode($elements)));
 update_post_meta($front,'_elementor_edit_mode','builder');
 if(defined('ELEMENTOR_VERSION')) update_post_meta($front,'_elementor_version',ELEMENTOR_VERSION);
}
add_action('after_switch_theme','lsc_seed_elementor_homepage');
