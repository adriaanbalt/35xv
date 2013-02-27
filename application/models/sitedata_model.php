<?php if (! defined('BASEPATH')) exit('No direct script access');

class SiteData_model extends MY_Model {

	function __construct()
    {
        $this->_table = 'site_data';
        parent::__construct();
    }

}