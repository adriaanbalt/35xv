<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Site extends CI_Controller {

	public function index()
	{

		// Use the home view for everthing inside <body>
		// We don't pass data in the second arguement
		// The TRUE flag returns the view as data instead of echoing
		$page['content'] = $this->load->view('home', '', TRUE);

		// Load page data into html5 boilerplate and echo to browser
		$this->load->view('template', $page);
	}

}

/* End of file site.php */
/* Location: ./application/controllers/site.php */