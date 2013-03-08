<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->library('ion_auth');
		$this->load->library('session');
		$this->load->library('form_validation');
		$this->load->database();
		$this->load->helper('url');
		$this->load->helper('html');
		$this->data['page_title'] = "Admin";
		$this->data['slug'] = "home";

		if ( !$this->ion_auth->logged_in()) { redirect('auth/login', 'refresh'); }

	}

	// Routes
    // X	Admin 					Home
    // X	admin/units 			Unit Availability
    // X	admin/inquiries 		Inquiry Table
    // o	admin/inquiries/csv 	Excel Download
    // X	admin/gallery/1     	Residences
    // X	admin/gallery/2     	Amenities & Service
    // X	admin/project-team  	Project Team
    // o	admin/press         	Press Links

	function index()
	{
		$this->data['message'] = (validation_errors()) ? validation_errors() : $this->session->flashdata('message');
		$this->data['content'] = $this->load->view('admin/index', $this->data, TRUE);
		$this->load->view('admin/template', $this->data);
	}

	function units()
	{
		$this->load->model('units_model', 'units');
		$this->load->model('sitedata_model', 'sitedata');
		$featured_unit_site_data = $this->sitedata->get_row_by_column('title', 'featured_plan');
		$featured_unit_id = $featured_unit_site_data->content;
		$units = $this->units->get_all(true);
		$this->data['page_title'] = "Unit Availability";
		$this->data['slug'] = "units";

		$this->load->library('table');


		$table_template = array (
                    'table_open'          => '<table class="admin-units-table table table-condensed table-hover" border="0" cellpadding="0" cellspacing="0">',
                    'heading_row_start'   => '<tr>',
                    'heading_row_end'     => '</tr>',
                    'heading_cell_start'  => '<th>',
                    'heading_cell_end'    => '</th>',

                    'row_start'           => '<tr class="unit-edit">',
                    'row_alt_start'       => '<tr class="unit-edit">',
                    'row_end'             => '</tr>',
                    'cell_start'          => '<td>',
                    'cell_end'            => '</td>',

                    'row_alt_end'         => '</tr>',
                    'cell_alt_start'      => '<td>',
                    'cell_alt_end'        => '</td>',

                    'table_close'         => '</table>'
              );

	$this->table->set_template($table_template);


			$this->table->set_heading('ID', 'Unit Number', 'Bed','Bath', 'Floor', 'SqFt', 'Price', 'Unit Status', 'Extended Edit' );

			// Clean up units data
			foreach ($units as $k => $unit) {
				// Strip off media links from end of array
    			$units[$k] = array_slice($unit, 0, 8);

    			// Format square footage
                $units[$k]['sqft'] = number_format($unit['sqft']);

                $units[$k]['extended_edit'] = anchor('#', 'Extended Edit', array('class' => 'unit-edit-extended') );

    			// Replace status codes with strings
    			// Format price as needed
	            switch ($unit['unit_status_id']) {
                case '2':
                    $units[$k]['unit_status_id'] = 'Contract Out';
                    $units[$k]['price'] = '-';
                    break;
                case '3':
                    $units[$k]['unit_status_id'] = 'Sold';
                    $units[$k]['price'] = '-';
                    break;                
                default:
                    $units[$k]['unit_status_id'] = 'Available';
                    $units[$k]['price'] = money_format('%.0n', $unit['price']);
                    break;
	            }


    		}

    	$featured_unit_options = array();

    	foreach ($units as $k => $unit) {
    		if ($unit['unit_status_id'] == 'Available') {
	    		$featured_unit_options[ $unit['id'] ] = $unit['unit_number'];
    		}
    	}

    	natsort($featured_unit_options);

		$c = heading('35XV Unit Availability');
		$selector = form_dropdown('featured_unit', $featured_unit_options, $featured_unit_id, 'class="span4 featured_unit_edit"');
		$c.= heading('Current Featured Unit &nbsp'.$selector, 3);
		$c.= heading('All Units', 4);

		$c.= $this->table->generate($units);
		$this->data['content'] = $c;
		$this->load->view('admin/template', $this->data);
	}

	function edit_unit_form($unit_id)
	{
		$this->load->model('unit_model', 'units');

		$extended_edit = false;

		if ($this->uri->segment(4) == 'extended') {
			$extended_edit = true;
		}

		if ($unit = $this->units->get($unit_id)) {
			$this->load->helper('form');
			echo form_open('admin/update_unit', array('class' => 'form form-horizontal') );
				echo form_hidden('id', $unit->id);

				// they won't need to edit Beds Baths Floor and square footage
				// but let's add an extended edit feature just in case
				if ($extended_edit){

				// echo '<div class="control-group">';
				// 	echo form_label('Unit Number', 'unit_number', array('class' => 'control-label') );
				// 		echo '&nbsp;';
				// 	echo form_input('unit_number', $unit->unit_number);
				// echo '</div>';

				echo '<div class="control-group">';
					echo form_label('Bedrooms', 'bedrooms', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_input('bedrooms', $unit->bedrooms);
				echo '</div>';
				echo '<div class="control-group">';
					echo form_label('Bathrooms', 'bathrooms', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_input('bathrooms', $unit->bathrooms);
				echo '</div>';
				echo '<div class="control-group">';
					echo form_label('Floor', 'floor', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_input('floor', $unit->floor);
				echo '</div>';
				echo '<div class="control-group">';
					echo form_label('Square Footage', 'sqft', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_input('sqft', $unit->sqft);
				echo '</div>';

				} else {
				// extended edit is not enabled so let's show a summary of the unit's info					
				echo heading('Bedrooms '. $unit->bedrooms .' Baths '. $unit->bathrooms .' Floor: '. $unit->floor, 4);
				}

				echo '<div class="control-group">';
					echo form_label('Price', 'price', array('class' => 'control-label') );
						echo '&nbsp;';
					$price_string = money_format('%.0n', $unit->price);
					echo form_input('price', $price_string);
				echo '</div>';

				echo '<div class="control-group">';

				$check_available = FALSE;
				$check_contract  = FALSE;
				$check_sold      = FALSE;

				switch ($unit->unit_status_id) {
					case '1':
						$check_available = TRUE;
						break;
					case '2':
						$check_contact = TRUE;
						break;
					case '3':
						$check_sold = TRUE;
						break;
					default:
						break;
				}

				$checkbox_available = array(
				    'name'        => 'unit_status_id',
				    'id'          => 'unit_status_available',
				    'value'       => '1',
				    'checked'     => $check_available
			    );
				$checkbox_contract = array(
				    'name'        => 'unit_status_id',
				    'id'          => 'unit_status_contract',
				    'value'       => '2',
				    'checked'     => $check_contract
			    );
				$checkbox_sold = array(
				    'name'        => 'unit_status_id',
				    'id'          => 'unit_status_sold',
				    'value'       => '3',
				    'checked'     => $check_sold
			    );
	

				echo heading('Unit Status:', 4);
				echo '<div class="control-group">';
					echo form_label('Available', 'unit_status_id', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_radio($checkbox_available);
				echo '</div>';
				echo '<div class="control-group">';
					echo form_label('In Contract', 'unit_status_id', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_radio($checkbox_contract);
				echo '</div>';
				echo '<div class="control-group">';
					echo form_label('Sold', 'unit_status_id', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_radio($checkbox_sold);
				echo '</div>';

				echo '</div>';

				echo '<div class="footer">';
					echo form_submit('submit', 'Save Changes to Unit', 'class="btn btn-primary"');
  				echo '</div>';
			echo form_close();
		} else {
			echo 'Something is wrong, there is no unit to edit.';
		}
	}

	function update_unit()
	{
		$unit_id = $this->input->post('id');
		$this->load->model('unit_model', 'units');
		if ($unit = $this->units->get($unit_id)) {
			$form_data = array(
				'id' 				=> $this->input->post('id'),
				'unit_number' 		=> $this->input->post('unit_number'),
				'bedrooms' 			=> $this->input->post('bedrooms'),
				'bathrooms' 		=> $this->input->post('bathrooms'),
				'floor' 			=> $this->input->post('floor'),
				'sqft' 				=> $this->input->post('sqft'),
				'price' 			=> $this->input->post('price'),
				'unit_status_id' 	=> $this->input->post('unit_status_id')
			);
			if ( $update_status = $this->units->update_row($form_data) ) {
				redirect('admin/units');
			} else {
				redirect('admin/units/#nochange');
			}
		} else {
			echo 'could not find a unit';
		}
	}

	function site_data()
	{
		$this->load->model('sitedata_model', 'site_data');
		$this->data['site_data'] = $this->site_data->get_all();
		$this->data['page_title'] = "Edit Site Data";
		$this->data['slug'] = "site_data";
		$this->data['content'] = $this->load->view('admin/site_data', $this->data, TRUE);
		$this->load->view('admin/template', $this->data);
	}

	function gallery($gallery_id)
	{
		$this->load->model('galleries_model', 'galleries');
		$this->data['gallery'] = $this->galleries->get_with_media($gallery_id);
		$this->data['content'] = $this->load->view('admin/gallery', $this->data, TRUE);
 		$this->data['page_title'] = "Edit Gallery";
		$this->data['slug'] = "gallery_".$gallery_id;
		$this->load->view('admin/template', $this->data);
	}

	function edit_gallery_item_form($media_id)
	{
		$this->load->model('media_model', 'media');
		if ($media = $this->media->get($media_id)) {
			$this->load->helper('form');
			echo form_open('admin/update_media_item', array('class' => 'form form-horizontal') );
				echo form_hidden('id', $media->id);
				echo form_hidden('gallery_id', $this->uri->segment(4) );
				echo '<div class="control-group">';
					echo form_label('Title', 'title', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_input('title', $media->media_title);
				echo '</div>';
				echo '<div class="control-group">';
					echo form_label('Description', 'description', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_textarea('description', $media->media_description);
				echo '</div>';
				echo '<div class="footer">';
					echo form_submit('submit', 'Save Changes to Media Item', 'class="btn btn-primary"');
  				echo '</div>';
			echo form_close();
		} else {
			echo 'Something is wrong, there is no media to edit.';
		}
	}

	function project_team()
	{
		$this->load->model('team_member_model', 'members');
		$team_members = $this->members->get_all();
		$s = heading('Project Team');
		foreach ($team_members as $k => $m) {
			$s.= '<div class="team-member well">';
			$s.= heading($m->title, 4 );
			$s.= heading($m->description, 6 );
			$s.= '<div data-membertitle="'.$m->title.'" data-memberid="'.$m->id.'" class="btn edit-team">Edit Team Member</div>';
			$s.= '</div>';
		}
 		$this->data['content'] = $s;
 		$this->data['page_title'] = "Project Team";
		$this->data['slug'] = "project_team";
 		$this->load->view('admin/template', $this->data);
	}

	function update_media_item()
	{
		$media_id = $this->input->post('id');
		$this->load->model('media_model', 'media');
		$gallery_id = $this->input->post('gallery_id');
		if ($media = $this->media->get($media_id)) {
			$form_data = array(
				'id' 						=> $this->input->post('id'),
				'media_title' 				=> $this->input->post('title'),
				'media_description' 		=> $this->input->post('description')
			);
			if ( $update_status = $this->media->update_row($form_data) ) {
				redirect('admin/gallery/'.$gallery_id);
			} else {
				redirect('admin/gallery/'.$gallery_id.'#nochange');
			}
		} else {
			echo 'could not find a media item';
		}
	}

	function edit_team_member_form($member_id)
	{
		$this->load->model('team_member_model', 'members');
		if ($member = $this->members->get($member_id)) {
			$this->load->helper('form');
			echo form_open('admin/update_team_member', array('class' => 'form form-horizontal') );
				echo form_hidden('id', $member->id);
				echo '<div class="control-group">';
					echo form_label('Title', 'title', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_input('title', $member->title);
				echo '</div>';
				echo '<div class="control-group">';
					echo form_label('Description', 'description', array('class' => 'control-label') );
						echo '&nbsp;';
					echo form_textarea('description', $member->description);
				echo '</div>';
				// echo '<div class="control-group">';
				// 	echo form_label('Image ID', 'image_id', array('class' => 'control-label') );
				// 		echo '&nbsp;';
				// 	echo form_input('image_id', $member->image_id);
				// echo '</div>';
				echo '<div class="footer">';
					// echo '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>';
					echo form_submit('submit', 'Save Changes to Team Member', 'class="btn btn-primary"');
  				echo '</div>';
			echo form_close();
		} else {
			echo 'Something is wrong, there is no unit to edit.';
		}
	}

	function update_team_member()
	{
		$member_id = $this->input->post('id');
		$this->load->model('team_member_model', 'members');
		if ($member = $this->members->get($member_id)) {
			$form_data = array(
				'id' 				=> $this->input->post('id'),
				'title' 			=> $this->input->post('title'),
				'description' 		=> $this->input->post('description'),
				'image_id' 			=> $this->input->post('image_id')
			);
			if ( $update_status = $this->members->update_row($form_data) ) {
				redirect('admin/project_team');
			} else {
				redirect('admin/project_team/#nochange');
			}
		} else {
			echo 'could not find a team member';
		}
	}

	function press()
	{
		$this->data['content'] = heading('Press');
 		$this->data['page_title'] = "Press";
		$this->data['slug'] = "press";
		$this->load->view('admin/template', $this->data);
	}

	function upload_media() {

		$this->load->model('media_model','media');
		$data->title = "Admin Panel";
		$data->gallery_id = $this->uri->segment(3);
		$data->media_id = $this->uri->segment(4);
		$data->upload_type = 'gallery_image';

		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png|jpeg';
		$config['max_size']	= '20048';
		$config['max_width']  = '0';
		$config['max_height']  = '0';
		$config['remove_spaces'] = 'TRUE';

		$this->load->library('upload');
		$this->load->library('image_lib');

		$this->upload->initialize($config);

		if ( ! $this->upload->do_upload())
		{
			$data->errors = $this->upload->display_errors();
			$data->content = $this->load->view('admin/upload', $data, true);
		}
		else
		{
			$uploaddata = $this->upload->data();

			$uploaddata['upload_type'] = $this->input->post('upload_type');
			$uploaddata['gallery_id']  = $this->input->post('gallery_id');
			$uploaddata['media_description']  = $this->input->post('media_description');

			$orig_w = $uploaddata['image_width'];
			$orig_h = $uploaddata['image_height'];

			$_scale = 1600 / $orig_h;
			$width = $_scale * $orig_w;

			$upload_config = array(
				'image_library' => 	'gd2',
				'source_image'	=> 	$uploaddata['full_path'],
				'create_thumb'  => 	FALSE,
				'maintain_ratio'=>	TRUE,
				'width'			=>  $width,
				'height' 		=>	'1600'
			);

			$this->image_lib->initialize($upload_config);

			if ( ! $this->image_lib->resize())
			{
			    $data->errors = $this->image_lib->display_errors();
			} else {
				$this->image_lib->clear();
				// update upload data with resized image data
				$imagedata = getimagesize($uploaddata['full_path']);
				$uploaddata['image_width'] 			= $imagedata[0];
				$uploaddata['image_height']			= $imagedata[1];
				$uploaddata['image_size_str']		= $imagedata[3];
				unset($uploaddata['gallery_id']);
				unset($uploaddata['upload_type']);
				// save the uploaded media's info to our media table
				if($media_id = $this->media->insert_object($uploaddata)) {
					// lookup this artist's gallery and then append our fresh item to the gallery
					// $gallery_result = $this->gallery->get_by_id($data->gallery_id);
					// $gallery_data['gallery_id'] = $gallery_result->gallery_id;
					// $gallery_data['media_ids'] = $gallery_result->media_ids.",".$media_id;
					// $this->gallery->UpdateForm($gallery_data);
				}

				// create the thumbnail now
				$thumb_config = array(
					'image_library' => 	'gd2',
					'source_image'	=> 	$uploaddata['full_path'],
					'create_thumb'  => 	TRUE,
					'maintain_ratio'=>	TRUE,
					'thumb_marker'  =>  '_t',
					'width'			=> 	'160',
					'height' 		=>	'110'
				);

				$this->image_lib->initialize($thumb_config);
				if ( ! $this->image_lib->resize())
				{
				    $data->errors = $this->image_lib->display_errors();
				}
				else
				{
					// all set, show the artist's page again
					$to = 'admin/upload_media/'.$this->input->post('id');
					redirect($to);
				}

			}
		}

	$this->load->view('template', $data);

	}

	function inquiry($id)
	{
		$this->load->model('inquiry_model', 'inquiries');
		var_dump($this->inquiries->get_by('id', 3));
	}

	function inquiries()
	{

		date_default_timezone_set('US/Eastern');

		$this->load->model('inquiry_model', 'inquiries');
		$this->load->library('table');
		$data['inquiries'] = array_reverse( $this->inquiries->get_all(true) );
		$data['inquiries_24hours']  =  0;
		$data['inquiries_week']     =  0;

		$past_day = strtotime("-1 day");
		$past_week = strtotime("-1 week");

		foreach ($data['inquiries'] as $key => $value) {
		  if(strtotime($value['last_updated']) > $past_day) {
		    $data['inquiries_24hours']++;
		}
		  if(strtotime($value['last_updated']) > $past_week) {
    		$data['inquiries_week']++;
		  }
		}

		foreach ($data['inquiries'] as $k => $v) {
            $last_updated = strtotime($v['last_updated']);
			$data['inquiries'][$k]['last_updated'] = date('m-d-y h:i A',$last_updated);
       	}

		$this->data['page_title'] = "Inquiries";
		$this->data['content'] = $this->load->view('admin/inquiries',$data, TRUE);
		$this->data['slug'] = "inquiries";
		$this->load->view('admin/template', $this->data);

	}

	public function create_inquiries_file()
	{
    	$this->load->helper('file');
	    $this->load->model('inquiry_model', 'inquiries');
	    $this->load->dbutil();
	    $query = $this->db->query("SELECT * FROM inquiries");
	    $data = $this->dbutil->csv_from_result($query);
	    if ( ! write_file('storage/35xv-inquiries.csv', $data))
    	{
       		echo 'Unable to write the file';
	    }
    	else
	    {
    		echo '';
	    }
	}

	public function inquiries_csv()
	{
		$this->create_inquiries_file();
		// Define the path to file
		$file = 'storage/35xv-inquiries.csv';

		// Set headers
  		header("Cache-Control: public");
  		header("Content-Description: File Transfer");
  		header("Content-Disposition: attachment; filename=$file");
  		header("Content-Type: application/zip");
  		header("Content-Transfer-Encoding: binary");

  		// Read the file from disk
  		readfile($file);
	}

}
