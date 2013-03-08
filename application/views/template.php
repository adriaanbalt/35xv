<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7 lt-ie"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8 lt-ie"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9 lt-ie"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <title><?= $site_data['site_title']; ?></title>

        <meta content='<?= $site_data['meta_description']; ?>' name='description' />
        <meta content='<?= $site_data['meta_keywords']; ?>' name='keywords' />

        <meta property="og:title" content="<?= $site_data['site_title']; ?>"/>
        <meta property="og:type" content="realestate"/>
        <meta property="og:url" content="http://www.35XV.com"/>
        <meta property="og:image" content="<?=site_url('asset/img/35xv-facebook.jpg'); ?>"/>
        <meta property="og:site_name" content="35XV - Luxury Amenity Highrise"/>
        <meta property="fb:admins" content="Adriaan Scholvinck, Ben Lundquist"/>
        <meta property="og:description" content="<?= $site_data['meta_description']; ?>"/>

        <meta name='author' content='Williams New York, Adriaan BALT Scholvinck, Ben Lundquist' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable = no'  />

        <link rel="stylesheet" href="asset/css/normalize.css">
        <link rel="stylesheet" href="asset/css/grid.css">
        <link rel="stylesheet" href="asset/css/screen.css">
        <link rel="stylesheet" href="asset/css/print.css">
        <link rel="stylesheet" href="asset/css/video-js.css">
        <!--[if IE]><link href="asset/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" /><![endif]-->
        <script src="asset/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>

    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <?php echo $content; ?>

        <?php //include_once("analyticstracking.php") ?>

        <script src="asset/js/utils/plugins.js?v=2"></script>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="asset/js/vendor/jquery-1.8.3.min.js"><\/script>')</script>
        <!--[if IE]><script src="asset/js/vendor/excanvas.js?v=2"></script><![endif]-->
        <script src="asset/js/vendor/jquery.mousewheel.js?v=2"></script>
        <script src='asset/js/vendor/Tween.js?v=2'></script>
        <script src="asset/js/vendor/equalize.min.js?v=2"></script>
        <script src="asset/js/vendor/video.min.js?v=2"></script>
        <script src="asset/js/vendor/jquery.history.js?v=2"></script>
        <script src='asset/js/vendor/jquery.tablesorter.min.js'></script>
        
        <script src='asset/js/utils/jquery.dropdown.js'></script>
        <script src='asset/js/utils/UTIL.IsMobile.js?v=2'></script>
        <script src='asset/js/utils/UTIL.BrowserDetect.js?v=2'></script>
        <script src='asset/js/utils/UTIL.LoadProgress.js?v=2'></script>

        <script src='asset/js/balt/BALT.nav.js?v=2'></script>
        <script src='asset/js/balt/BALT.loader.js?v=2'></script>
        <script src='asset/js/balt/BALT.utils.js?v=2'></script>
        <script src='asset/js/balt/BALT.modal.js?v=2'></script>
        <script src='asset/js/balt/BALT.imageSequence.js?v=2'></script>
        <script src='asset/js/balt/BALT.galleryScroll.js?v=2'></script>
        <script src='asset/js/balt/BALT.animations.js?v=2'></script>

        <script src='asset/js/williams.35xv.main.js?v=2'></script>

    </body>
</html>