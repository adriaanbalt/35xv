<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Site extends CI_Controller {

	public function index()
	{

		// Load up the unit availabilty chart into $data for inclusion in the home template
		$data['unit_availability'] = $this->_unit_availability();

		// Use the home view for everthing inside <body>
		// We don't pass data in the second arguement
		// The TRUE flag returns the view as data instead of echoing
		$page['content'] = $this->load->view('home', $data, TRUE);

		// Load page data into html5 boilerplate and echo to browser
		$this->load->view('template', $page);
	}

	public function _unit_availability()
	{
		$this->load->model('units_model', 'units');
		$this->load->library('table');
		$this->load->helper('html');
		$units = $this->units->get_available();

		$table_template = array (
                    'table_open'          => '<table border="0" cellpadding="0" cellspacing="0">',
                    'heading_row_start'   => '<tr>',
                    'heading_row_end'     => '</tr>',
                    'heading_cell_start'  => '<th><a href="javascript:void(0);">',
                    'heading_cell_end'    => '<span class="arrow down"></span></a></th>',

                    'row_start'           => '<tr>',
                    'row_end'             => '</tr>',
                    'cell_start'          => '<td>',
                    'cell_end'            => '</td>',

                    'row_alt_start'       => '<tr>',
                    'row_alt_end'         => '</tr>',
                    'cell_alt_start'      => '<td>',
                    'cell_alt_end'        => '</td>',

                    'table_close'         => '</table>'
              );

		$this->table->set_template($table_template);
		$section['content'] = $this->table->generate($units);

		$section['title'] = "UNIT<br />AVAILABILITY";
		$section['css_id'] = "unit-availability";
		$section['inner_div_classes'] = "padded-inner content-box center";

		return $this->load->view('section', $section, TRUE);
	}

}

/* End of file site.php */
/* Location: ./application/controllers/site.php */