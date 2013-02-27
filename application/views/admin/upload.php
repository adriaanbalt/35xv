<?php

	if (isset($errors)) { echo $errors; };

	$form_attributes = array('class' => 'form-horizontal', 'id' => 'artist-gallery-media-uploader');

	echo form_open_multipart('auth/upload_media/'.$gallery_id, $form_attributes);
	echo form_hidden('gallery_id', $gallery_id);
	echo form_hidden('upload_type', $upload_type);
	echo form_hidden('media_id', $media_id);


?>

	<div class="control-group">
		<label for="media_description">Media Description</label>
		<input type="text" name="description" size="20" />
	</div>



	<div class="control-group">
		<input type="file" name="userfile" size="20" />
	</div>

	<div class="control-group">
		<input type="submit" value="upload" class="btn" />
	</div>

</form>