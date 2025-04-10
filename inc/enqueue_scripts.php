<?php
/**
 * Enqueue functions.
 *
 * @see https://rosait.ru/wiki/
 *
 * @version 1.0
 */
defined("_Rosait2025") or die("Доступ запрещён");

add_action( 'wp_enqueue_scripts', 'rs_style_theme');
function rs_style_theme() {
    if(isset($post->post_type) && $post->post_type == 'alboms') {
        wp_enqueue_script( 'jquery' );
    }

    //Подключение стилей библиотек
    wp_enqueue_style( 'swiper', get_stylesheet_directory_uri().'/lib/swiper/swiper-bundle.min.css',array(), "", 'screen');
    wp_enqueue_style( 'fancybox', get_stylesheet_directory_uri().'/lib/fancybox/fancybox.css',array(), "", 'screen');

    wp_enqueue_style( 'style', get_stylesheet_directory_uri().'/style.css',array(), "", 'screen');

    //Подключение стилей темы / шапка / подвал
    wp_enqueue_style( 'rs-style', get_stylesheet_directory_uri().'/css/rs-style.css',array(), "", 'screen');
    wp_enqueue_style( 'rs-header', get_stylesheet_directory_uri().'/css/rs-header.css',array(), "", 'screen');
    wp_enqueue_style( 'rs-footer', get_stylesheet_directory_uri().'/css/rs-footer.css',array(), "", 'screen');

    if(is_404()){
        wp_enqueue_style( 'style-error', get_stylesheet_directory_uri().'/css/rs-error-block.css',array(), "", 'screen');
    }

    if(is_search()){
        wp_enqueue_style( 'style-search', get_stylesheet_directory_uri().'/css/rs-search.css',array(), "", 'screen');
    }

    //Подключение скриптов
    wp_enqueue_script('swiper', get_stylesheet_directory_uri().'/lib/swiper/swiper-bundle.min.js',[],false,['in_footer' => true,'strategy'  => 'async',]);
    wp_enqueue_script('fancybox', get_stylesheet_directory_uri().'/lib/fancybox/fancybox.umd.js',[],false,['in_footer' => true,'strategy'  => 'async',]);

    wp_enqueue_script('rs-script', get_stylesheet_directory_uri().'/js/rs-script.js',['fancybox'],false,['in_footer' => true,'strategy'  => 'defer',]);
    //добавление данных локализации
    wp_localize_script( 'rs-script', 'rs_ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ),'page_title'=>get_the_title()));

    wp_enqueue_script('gsap', get_stylesheet_directory_uri().'/lib/gsap/gsap.min.js',[],false,['in_footer' => true,'strategy'  => 'async',]);
    wp_enqueue_script('ScrollTrigger', get_stylesheet_directory_uri().'/lib/gsap/ScrollTrigger.min.js',[],false,['in_footer' => true,'strategy'  => 'async',]);
    wp_enqueue_script('app', get_stylesheet_directory_uri().'/js/rs-animation.js',['gsap','ScrollTrigger'],false,['in_footer' => true,'strategy'  => 'defer',]);
    wp_enqueue_script('SmoothScroll', 'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js',[],false,['in_footer' => true,'strategy'  => 'async',]);

    //добавление скрипта inline
    wp_add_inline_script("SmoothScroll", 'SmoothScroll({ animationTime: 1e3, stepSize: 100, accelerationDelta: 50, accelerationMax: 3, touchpadSupport: !1 })');

    wp_enqueue_script('rs-header', get_stylesheet_directory_uri().'/js/rs-header.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

//Скрипт подключения карты
function rs_contacts_script(){
    wp_enqueue_script('api-maps','https://api-maps.yandex.ru/2.1?apikey=38863ba5-9462-46dc-940c-d9fed985abff&lang=ru_RU',[],'');
    wp_enqueue_script('rs-contacts', get_stylesheet_directory_uri().'/js/rs-contacts.js',['api-maps'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

//Подключение js пагинации
function rs_pagination_style(){
    wp_enqueue_style( 'pagination', get_stylesheet_directory_uri().'/lib/paginationjs/pagination.css',array(), "", 'screen');
    wp_enqueue_script('pagination', get_stylesheet_directory_uri().'/lib/paginationjs/pagination.js',['jquery'],false,['in_footer' => true,'strategy'  => 'async',]);
}

//Стили для блоков
function rs_catalog_style(){
    wp_enqueue_style( 'rs_catalog', get_stylesheet_directory_uri().'/css/rs-catalog.css');
    wp_enqueue_script('rs_catalog', get_stylesheet_directory_uri().'/js/rs-catalog.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

function rs_grid_block_style() {
    wp_enqueue_style( 'rs-grid-block', get_stylesheet_directory_uri().'/css/rs-grid-block.css');
}

function rs_article_style() {
    wp_enqueue_style( 'rs-article', get_stylesheet_directory_uri().'/css/rs-article.css');
}

function rs_slider_style() {
    wp_enqueue_style( 'rs-slider', get_stylesheet_directory_uri().'/css/rs-slider.css');
    wp_enqueue_script('rs-slider', get_stylesheet_directory_uri().'/js/rs-slider.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

function rs_slider_block_style(){
    wp_enqueue_style( 'rs-slider_block', get_stylesheet_directory_uri().'/css/rs-slider-block.css',array(), null, 'screen');
    wp_enqueue_script('rs-slider_block', get_stylesheet_directory_uri().'/js/rs-slider-block.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

function rs_gallery_style(){
    wp_enqueue_style( 'rs-gallery', get_stylesheet_directory_uri().'/css/rs-gallery.css',array(), null, 'screen');
    wp_enqueue_script('rs-gallery', get_stylesheet_directory_uri().'/js/rs-gallery.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

function rs_partners_style(){
    wp_enqueue_style( 'rs-partners', get_stylesheet_directory_uri().'/css/rs-partners.css',array(), null, 'screen');
    wp_enqueue_script('rs-partners', get_stylesheet_directory_uri().'/js/rs-partners.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

function rs_team_style() {
    wp_enqueue_style( 'rs-team', get_stylesheet_directory_uri().'/css/rs-team.css');
}

function rs_reviews_block_style() {
    wp_enqueue_style( 'rs_reviews', get_stylesheet_directory_uri().'/css/rs-reviews.css');
    wp_enqueue_script('rs_reviews', get_stylesheet_directory_uri().'/js/rs-reviews.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

function rs_parallax_style(){
    wp_enqueue_style( 'rs_parallax', get_stylesheet_directory_uri().'/css/rs-parallax.css',array(), null, 'screen');
}

function rs_quote_style(){
    wp_enqueue_style( 'rs_quote', get_stylesheet_directory_uri().'/css/rs-quote.css',array(), null, 'screen');
}

function rs_number_style(){
    wp_enqueue_style( 'rs_number', get_stylesheet_directory_uri().'/css/rs-number.css',array(), null, 'screen');
    wp_enqueue_script_module('rs-number', get_stylesheet_directory_uri().'/js/rs-number.js',['rs-script'],false);
}

function rs_timer_style(){
    wp_enqueue_style( 'rs-timer', get_stylesheet_directory_uri().'/css/rs-timer.css',array(), null, 'screen');
    wp_enqueue_script('rs-timer', get_stylesheet_directory_uri().'/js/rs-timer.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

function rs_text_block_style(){
    wp_enqueue_style( 'rs_text_block', get_stylesheet_directory_uri().'/css/rs-text-block.css',array(), null, 'screen');
}

function rs_services_style(){
    wp_enqueue_style( 'rs_services', get_stylesheet_directory_uri().'/css/rs-services.css',array(), null, 'screen');
}

function rs_tabs_style(){
    wp_enqueue_style( 'rs_tabs', get_stylesheet_directory_uri().'/css/rs-tabs.css',array(), null, 'screen');
}

function rs_accordion_style(){
    wp_enqueue_style( 'rs_accordion', get_stylesheet_directory_uri().'/css/rs-accordion.css',array(), null, 'screen');
}

function rs_documents_style(){
    wp_enqueue_style( 'rs_documents', get_stylesheet_directory_uri().'/css/rs-documents.css',array(), null, 'screen');
}

function rs_tariff_style(){
    wp_enqueue_style( 'rs_tariff', get_stylesheet_directory_uri().'/css/rs-tariff.css',array(), null, 'screen');
}

function rs_feedback_style(){
    wp_enqueue_style( 'rs_feedback', get_stylesheet_directory_uri().'/css/rs-feedback.css',array(), null, 'screen');
}

function rs_subscribe_style(){
    wp_enqueue_style( 'rs_subscribe', get_stylesheet_directory_uri().'/css/rs-subscribe.css',array(), null, 'screen');
}

function rs_contacts_style(){
    wp_enqueue_style( 'rs_contacts', get_stylesheet_directory_uri().'/css/rs-contacts.css',array(), null, 'screen');
}

function rs_features_style(){
    wp_enqueue_style( 'rs-features', get_stylesheet_directory_uri().'/css/rs-features.css',array(), null, 'screen');
    wp_enqueue_script('rs-features', get_stylesheet_directory_uri().'/js/rs-features.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}

function rs_features_row_style(){
    wp_enqueue_style( 'rs-features-row', get_stylesheet_directory_uri().'/css/rs-features-row.css',array(), null, 'screen');
}

function rs_features_img_style(){
    wp_enqueue_style( 'rs_features_img_style', get_stylesheet_directory_uri().'/css/rs-features-img.css',array(), null, 'screen');
}

function rs_steps_style(){
    wp_enqueue_style( 'rs-steps', get_stylesheet_directory_uri().'/css/rs-steps.css',array(), null, 'screen');
}

function rs_news_style(){
    wp_enqueue_style( 'rs-news', get_stylesheet_directory_uri().'/css/rs-news.css',array(), null, 'screen');
    wp_enqueue_script('rs-news', get_stylesheet_directory_uri().'/js/rs-news.js',['rs-script'],false,['in_footer' => true,'strategy'  => 'defer',]);
}