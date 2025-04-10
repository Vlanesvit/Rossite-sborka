<?php
defined("_Rosait2025") or die("Доступ запрещён");

global $wpdb,$exc,$type_blocks,$type_tabs;

//Список типов блоков
$type_blocks=array(
    'content'=>'Содержимое страницы',
    'text-block' => 'Текстовый блок (текст + картинка)',
    'table' => 'Таблица',
    'catalog' => 'Каталог',
    'features-custom' => 'Преимущества',
    'features' => 'Преимущества (3/4/5 в ряд)',
    'features-img' => 'Преимущества с картинкой',
    'steps' => 'Как мы работаем',
    'parallax' => 'Параллакс',
    'quote' => 'Цитата',
    'bg-video' => 'Фоновое видео',
    'block-video' => 'Видео',
    'gallery' => 'Адаптивная фотогалерея',
    'slider-block' => 'Фотогалерея c подписями',
    'partners' => 'Логотипы клиентов',
    'timer_act' => 'До окончания акции осталось',
    'number' => 'Цифры',
    'tabs' => 'Блок с переключателями',
    'accordion' => 'Аккордеон',
    'feedback' => 'Cвяжитесь с нами',
    'subscribe' => 'Подписаться',
    'form' => 'Нужна консультация специалиста',
    'contacts' => 'Контакты',
    'documents' => 'Документы',
    'tariff' => 'Прайс',
    'slider' => 'Слайдер',
    'news' => 'Новости',
    'team' => 'Команда',
    'alboms' => 'Альбомы',
    'reviews' => 'Отзывы',
);
//Сортировка
//asort($type_blocks);
//исключение блока для типа записи
$exc = array(
    'services'=>array('content'),
);

//Список типов содержимого вкладки
$type_tabs=array(
    'txt'=>'Текстовый блок (текст + картинка)',
    'map' => 'Карта',
    'table' => 'Таблица',
    'video' => 'Видео',
);

//Константы
if (!defined('DB_PREFIX')) {
    define('DB_PREFIX',$wpdb->prefix);
}

//ID главной страницы сайта
if (!defined('FRONT_PAGE')) {
    define('FRONT_PAGE',get_option( 'page_on_front' ));
}
//Ссылка на главную страницу сайта
if (!defined('FRONT_PAGE_LINK')) {
    define('FRONT_PAGE_LINK',site_url());
}
if (!defined('DEFAULT_IMAGE_ID')) {
    define('DEFAULT_IMAGE_ID',645);
}
if (!defined('DEFAULT_IMAGE')) {
    define('DEFAULT_IMAGE',wp_get_attachment_image_url( DEFAULT_IMAGE_ID, 'full' ));
}

add_action('acf/init', 'rosait_acf_init');
function rosait_acf_init()
{
       //Страница опций
        if( function_exists('acf_add_options_page') ) {
            $arg = array(
                'page_title' => __('Параметры'),
                'menu_title' => __('Параметры'),
                'menu_slug' => 'rs-options',
                'capability' => 'edit_posts',
                'icon_url' => 'dashicons-admin-settings',
                'redirect' => true,
                'post_id' => 'options',
                'position' => '53.1',
            );
            acf_add_options_page($arg);
        }



    if( function_exists('acf_add_options_sub_page') ) {
        // Register options page.
         acf_add_options_sub_page(array(
            'page_title'    => __('Настройки сайта'),
            'menu_title'    => __('Настройки'),
            'parent_slug'     => 'rs-options',
        ));

        acf_add_options_sub_page(array(
            'page_title' => 'Контактные данные',
            'menu_title' => 'Контакты',
            'parent_slug' => 'rs-options',
        ));
    }
}

//Динамический список popup форм ACF
function acf_load_modal_field_choices( $field ) {

    // Reset choices
    $field['choices'] = array();

    // Check to see if Repeater has rows of data to loop over
    if( have_rows('popup_forms', 'options') ) {

        // Execute repeatedly as long as the below statement is true
        while( have_rows('popup_forms', 'options') ) {

            // Return an array with all values after the loop is complete
            the_row();


            // Variables
            $value = get_sub_field('id_modal');
            $label = get_sub_field('id_modal').' ('.get_sub_field('title_form').')';


            // Append to choices
            $field['choices'][ $value ] = $label;

        }

    }


    // Return the field
    return $field;

}
add_filter('acf/load_field/name=modal', 'acf_load_modal_field_choices');
//Динамический список социальных сетей
function acf_load_social_field_choices( $field ) {

    // Reset choices
    $field['choices'] = array();

    // Check to see if Repeater has rows of data to loop over
    if( have_rows('social', 'options') ) {
        // Execute repeatedly as long as the below statement is true
        while( have_rows('social', 'options') ) {

            // Return an array with all values after the loop is complete
            the_row();
            // Variables
            $value = get_sub_field('name');
            $label = get_sub_field('name');
            // Append to choices
            $field['choices'][ $value ] = $label;
        }
    }
    // Return the field
    return $field;
}
add_filter('acf/load_field/name=social_btn', 'acf_load_social_field_choices');
//Динамический список для Блок «Прайс»
function acf_load_tariff_field_choices( $field ) {

    // Reset choices
    $field['choices'] = array();

    // Check to see if Repeater has rows of data to loop over
    if( have_rows('tariff_properties', 'options') ) {
        // Execute repeatedly as long as the below statement is true
        $count =0;
        while( have_rows('tariff_properties', 'options') ) {

            // Return an array with all values after the loop is complete
            the_row();
            // Variables
            $value = 'propertie_'.$count;
            $label = get_sub_field('propertie');
            // Append to choices
            $field['choices'][ $value ] = $label;
            $count++;
        }
    }
    // Return the field
    return $field;
}
add_filter('acf/load_field/name=tariff_item', 'acf_load_tariff_field_choices');
//tabs_properties; type_tab
function acf_load_tabs_field_choices( $field ) {
 global $type_tabs;
    // Reset choices
    $field['choices'] = array();
    if( is_array($type_tabs) ) {
        foreach ($type_tabs as $key=> $type){
            $value = $key;
            $label = $type;
            $field['choices'][ $value ] = $label;
        }
    }

    // Check to see if Repeater has rows of data to loop over
    /*if( have_rows('tabs_properties', 'options') ) {
        // Execute repeatedly as long as the below statement is true
        $count =0;
        while( have_rows('tabs_properties', 'options') ) {

            // Return an array with all values after the loop is complete
            the_row();
            // Variables
            $value = get_sub_field('key');
            $label = get_sub_field('propertie');
            // Append to choices
            $field['choices'][ $value ] = $label;
            $count++;
        }
    }*/
    // Return the field
    return $field;
}
add_filter('acf/load_field/name=type_tab', 'acf_load_tabs_field_choices');
//Варианты меню
function acf_load_menu_field_choices( $field ) {
    // Reset choices
    $field['choices'] = array();

    $menus = wp_get_nav_menus();

    // Check to see if Repeater has rows of data to loop over
    if( is_array($menus) ) {
        // Execute repeatedly as long as the below statement is true
        foreach ($menus as $menu){
            $value = $menu->term_id;
            $label = $menu->name;
            // Append to choices
            $field['choices'][ $value ] = $label;
        }
    }
    // Return the field
    return $field;
}
add_filter('acf/load_field/name=footer_menu', 'acf_load_menu_field_choices');
add_filter('acf/load_field/name=sidebar_menu', 'acf_load_menu_field_choices');

add_filter('acf/load_field/name=type_blocks', 'acf_load_blocks_choices');
function acf_load_blocks_choices($field){
    global $post,$exc,$type_blocks;
    // Reset choices
    $field['choices'] = array();
    if( is_array($type_blocks) ) {
       if(isset($post->post_type) && isset($exc[$post->post_type])) {
           foreach ($exc[$post->post_type] as $item){
               unset($type_blocks[$item]);
           }
       }
        // Execute repeatedly as long as the below statement is true
        foreach ($type_blocks as $key=> $type){
            $value = $key;
            $label = $type;
            // Append to choices
            $field['choices'][ $value ] = $label;
        }
    }
    // Return the field
    return $field;
}

//Настройки темы
add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar() {
    if (!current_user_can('administrator') && !is_admin()) {
        show_admin_bar(false);
    }
}

//Лого в настройках сайта
function site_logo( $wp_customize ){
    //Settings
    $wp_customize->add_setting( 'site_logo_white' );//Setting for logo uploader
    $wp_customize->add_setting( 'site_logo_black' );//Setting for logo uploader

    //Controls
    $wp_customize->add_control(
        new WP_Customize_Image_Control(
            $wp_customize,
            'site_logo_white',
            array(
                'label'      => 'Лого сайта (светлое)',
                'section'    => 'title_tagline',
                'settings'   => 'site_logo_white'
            )
        )
    );
    $wp_customize->add_control(
        new WP_Customize_Image_Control(
            $wp_customize,
            'site_logo_black',
            array(
                'label'      => 'Лого сайта (темное)',
                'section'    => 'title_tagline',
                'settings'   => 'site_logo_black'
            )
        )
    );
}
add_action('customize_register', 'site_logo');

if ( !function_exists('rs_setup') ) :
    function rs_setup()
    {
        /*
         * Поддержка динамического заголовка страницы — важная функция для SEO
         */
        add_theme_support('title-tag');

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * See: https://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
         */
        add_theme_support('post-thumbnails');
        set_post_thumbnail_size(360, 415, TRUE);
        add_image_size('news-thumbnails', 360, 284, TRUE);

        // This theme uses wp_nav_menu() in two locations.
        register_nav_menus(array(
            'primary' => __('Primary Menu', 'rosait'),
            'secondary' => __('Secondary Menu', 'rosait'),
        ));

        /*
         * Switch default core markup for search form, script, and style
         * to output valid HTML5.
         */
        add_theme_support('html5', array('search-form', 'script', 'style'));
    }
endif;
add_action('after_setup_theme', 'rs_setup');

//Remove WordPress version number
add_filter ( 'the_generator' ,  '__return_false' );

//Remove wlwmanifest link
remove_action( 'wp_head', 'wlwmanifest_link');

//Disable emojis in WordPress
add_action( 'init', 'smartwp_disable_emojis' );
function smartwp_disable_emojis() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
}
function disable_emojis_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
        return array();
    }
}

//Изменить данные формы
//Вывод форм
add_filter('wpcf7_autop_or_not', '__return_false');
add_filter( 'wpcf7_form_autocomplete', function ( $autocomplete ) {
    $autocomplete = 'off';
    return $autocomplete;
}, 100, 1 );

//от кого письмо
function change_name($name) {
    return get_bloginfo('name');
}
add_filter('wp_mail_from_name','change_name');
function change_email($email) {
    $url =get_home_url();
    $domain = explode('//',$url);
    return 'no-reply@'.$domain[1];
}
add_filter('wp_mail_from','change_email');

// Включение SVG и webp  в список разрешенных для загрузки файлов
add_filter( 'upload_mimes', 'svg_upload_allow' );
function svg_upload_allow( $mimes ) {
    $mimes['svg']  = 'image/svg+xml';
    $mimes['ico']  = 'image/x-icon';
    $mimes['webp'] = 'image/webp';
    return $mimes;
}
// Исправление MIME типа для SVG файлов.
add_filter( 'wp_check_filetype_and_ext', 'fix_svg_mime_type', 10, 5 );
function fix_svg_mime_type( $data, $file, $filename, $mimes, $real_mime = '' ){
    // WP 5.1 +
    $ext = isset( $data['ext'] ) ? $data['ext'] : '';
    if ( strlen( $ext ) < 1 ) {
        $exploded = explode( '.', $filename );
        $ext      = strtolower( end( $exploded ) );
    }
    if ( $ext === 'svg' ) {
        $data['type'] = 'image/svg+xml';
        $data['ext']  = 'svg';
    } elseif ( $ext === 'svgz' ) {
        $data['type'] = 'image/svg+xml';
        $data['ext']  = 'svgz';
    }
    return $data;
}
# Формирует данные для отображения SVG как изображения в медиабиблиотеке.
add_filter( 'wp_prepare_attachment_for_js', 'show_svg_in_media_library' );
function show_svg_in_media_library( $response ) {
    if ( $response['mime'] === 'image/svg+xml' || $response['mime'] === 'image/webp' ) {
        // С выводом названия файла
        $response['image'] = [
            'src' => $response['url'],
        ];
    }
    return $response;
}

//Удалим префикс заголовка архивов
add_filter( 'get_the_archive_title_prefix', '__return_empty_string' );