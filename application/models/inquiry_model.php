<?php if (! defined('BASEPATH')) exit('No direct script access');

class Inquiry_model extends MY_Model {

	function __construct()
    {
        $this->_table = 'inquiries';
        parent::__construct();
    }

}