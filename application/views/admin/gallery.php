<?php

foreach ($gallery->media as $k => $m) {

	$_scale = 5;
	$gallery_image_properties = array(
          'src' => $m->file_path,
          'alt' => $m->media_description,
          'class' => 'gallery_image',
          'width' => $m->image_width / $_scale,
          'height' => $m->image_height / $_scale,
          'title' => $m->media_title,
          'data-mediaid' => $m->id,
          'data-galleryid' => $gallery->id,
          'rel' => 'lightbox',
);
	echo img( $gallery_image_properties );
}
?>