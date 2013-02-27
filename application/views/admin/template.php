<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <title><?php echo $page_title; ?> | 35xv Site Admin</title>

        <meta name='author' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable = no'  />
        <link rel="stylesheet" type="text/css" href="<?php echo site_url('asset/admin/bootstrap/css/bootstrap.css'); ?>"></link>
        <link rel="stylesheet" type="text/css" href="<?php echo site_url('asset/admin/35xv.admin.css'); ?>"></link>

    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

                <div class="navbar navbar-inverse navbar-fixed-top">
                      <div class="navbar-inner">
                        <div class="container-fluid">
                          <button type="button" class="btn btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                          </button>
                          <a class="brand" href="#">35XV</a>
                          <div class="nav-collapse collapse" style="height: 0px; ">
                            <p class="navbar-text pull-right">
                              Logged in as <a href="#" class="navbar-link">Username</a>
                            </p>
                            <ul class="nav">
                              <li class="active"><a href="#">Home</a></li>
                            </ul>
                          </div><!--/.nav-collapse -->
                        </div>
                      </div>
                </div>
<br /><br /><br /><br />
      <div class="container-fluid">
      <div class="row-fluid">
        <div class="span3">
          <div class="well sidebar-nav">
            <ul class="nav nav-list">
              <li class="nav-header">Admin</li>
                <li class="<?php if($slug == 'home'){ echo 'active'; } ?>" >
                  <?php echo anchor('admin', '<i class="icon-home"> </i> Home'); ?>
                </li>
                <li class="<?php if($slug == 'units'){ echo 'active'; } ?>" >
                  <?php echo anchor('admin/units', '<i class="icon-th-list"> </i> Unit Availability'); ?>
                </li>
              <li class="nav-header">Contact Form</li>
                <li class="<?php if($slug == 'inquiries'){ echo 'active'; } ?>" >
                  <?php echo anchor('admin/inquiries', '<i class="icon-user"> </i> Inquries Table'); ?>
                </li>
                <li>
                  <?php echo anchor('admin/inquiries_csv', '<i class="icon-circle-arrow-down"> </i> Excel Download'); ?>
                </li>
              <li class="nav-header">Edit Galleries</li>
                <li class="<?php if($slug == 'gallery_1'){ echo 'active'; } ?>" >
                  <?php echo anchor('admin/gallery/1', '<i class="icon-th"> </i> Residences'); ?>
                <li class="<?php if($slug == 'gallery_2'){ echo 'active'; } ?>" >
                  <?php echo anchor('admin/gallery/2', '<i class="icon-th"> </i> Amenities & Service'); ?>
              <li class="nav-header">Edit Content</li>
                <li class="<?php if($slug == 'design_team'){ echo 'active'; } ?>" >
                  <?php echo anchor('admin/design_team', '<i class="icon-facetime-video"> </i> Design Team'); ?>
                </li>
                <li class="<?php if($slug == 'project_team'){ echo 'active'; } ?>" >
                  <?php echo anchor('admin/project_team', '<i class="icon-briefcase"> </i> Project Team'); ?>
                </li>
                <li class="<?php if($slug == 'press'){ echo 'active'; } ?>" >
                  <?php echo anchor('admin/press', '<i class="icon-bullhorn"> </i> Press Links'); ?>
                </li>
            </ul>
          </div><!--/.well -->
        </div><!--/span-->
        <div class="span9">
            <?php echo $content; ?>
        </div><!--/span-->
      </div><!--/row-->

    </div>



<div id="modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="modalHeader">Modal header</h3>
  </div>
  <div class="modal-body">
    <p>One fine body…</p>
  </div>
</div>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="asset/js/vendor/jquery-1.8.3.min.js"><\/script>')</script>
        <script src="<?php echo site_url('asset/admin/bootstrap/js/bootstrap.js'); ?>"></script>
        <script src="<?php echo site_url('asset/admin/js/plugins.js'); ?>"></script>
        <script> var BASE_URL = "<?php echo base_url(); ?>"; </script>
        <script src="<?php echo site_url('asset/admin/js/35xv.admin.js'); ?>"></script>



    </body>
</html>
