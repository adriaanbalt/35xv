<?php if (! defined('BASEPATH')) exit('No direct script access');

class Articles_model extends MY_Model {

	function __construct()
    {
        $this->_table = 'articles';
        parent::__construct();
    }

}