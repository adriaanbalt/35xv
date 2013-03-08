<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Site extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->library('ion_auth');
		$this->load->library('session');
		$this->load->library('form_validation');
		$this->load->helper('url');
	}

	function change_sitedata_ajax(){

		$data['id'] = $this->input->post('id');
		$data['content'] = $this->input->post('content');

		$this->load->model('sitedata_model', 'site_data');
		$this->site_data->update_row($data);

	}

	public function index()
	{

		if (!$this->ion_auth->logged_in())
		{
			//redirect them to the login page
			redirect('auth/login', 'refresh');
		}
		else
		{

		$this->load->database();
		$this->load->model('sitedata_model', 'site_data');
		$site_data = $this->site_data->get_all();
		foreach ($site_data as $k => $d) { $data->site_data[$d->title] = $d->content; }

		$data->site_data['press_active'] = 1;

		// Load up the unit availabilty chart into $data for inclusion in the home template
		$data->unit_availability = $this->_unit_availability();

		$this->load->model('units_model', 'units');
		$data->featured_unit = $this->units->get($data->site_data['featured_plan']);

		// Load up the galleries
		$this->load->model('galleries_model', 'galleries');
		$data->residences_gallery = $this->galleries->get_with_media(1);
		$data->amenities_gallery  = $this->galleries->get_with_media(2);

		// Get press articles
		$this->load->model('articles_model', 'articles');
		$data->press_articles = $this->articles->get_all();

		// Get team members
		$this->load->model('team_member_model', 'team');
		$data->team_members = $this->team->get_all();

		// Load up the contact form  into $data for inclusion in the home template
		// Included options are long, short & tiny.
		// Unfortunately the long one is what they are using currently
		// The view files are at application/views/contact/{{size}}
		// I'm using twitter bootstrap markup for the control groups but you can adjust as needed	
		$data->contact_form = $this->_contact_form('long');

		// Use the home view for everthing inside <body>
		// We don't pass data in the second arguement
		// The TRUE flag returns the view as data instead of echoing
		$data->content = $this->load->view('home', $data, TRUE);

		// Load page data into html5 boilerplate and echo to browser
		$this->load->view('template', $data);

		}
	}

	public function _contact_form($form_length = "small"){
		$section['content'] = $this->load->view('contact/'.$form_length,'', TRUE);
		$section['title'] = "CONTACT";
		$section['css_class'] = "contact";
		$section['inner_div_classes'] = "padded-inner content-box";
		return $this->load->view('section', $section, TRUE);
	}

	public function _unit_availability()
	{
		$this->load->model('units_model', 'units');
		$this->load->library('table');
		$this->load->helper('html');

		$units = $this->units->get_available();

		$table_template = array (
                    'table_open'          => '<table id="availability" border="0" cellpadding="0" cellspacing="0">',
                    'heading_row_start'   => '<tr>',
                    'heading_row_end'     => '</tr>',
                    'heading_cell_start'  => '<th>',
                    'heading_cell_end'    => '</th>',

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

		$section['title'] = "FLOOR<br />PLANS";
		$section['css_class'] = "floor-plans";
		$section['inner_div_classes'] = "padded-inner content-box center";

		return $this->load->view('section', $section, TRUE);
	}

}

/* End of file site.php */
/* Location: ./application/controllers/site.php */