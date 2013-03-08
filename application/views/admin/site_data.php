<?php

	echo heading('35XV Site Data');
	
	foreach ($site_data as $key => $value) {

		if ($key < 8) {
			echo form_label($value->title, $key);
			$data = array(
              'name'        => $value->id,
              'value'       => $value->content,
              'title'		=> $value->title,
              'maxlength'   => '500',
              'class'		=> 'span8 site_data_input'
        	);
			echo form_input($data);
			echo br(2);
		}

	}

?>