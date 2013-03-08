<?php if (! defined('BASEPATH')) exit('No direct script access');

class Media_model extends MY_Model {

	function __construct()
    {
        $this->_table = 'media';
        parent::__construct();
    }

}