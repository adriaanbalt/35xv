<?php if (! defined('BASEPATH')) exit('No direct script access');

class Team_member_model extends MY_Model {

	function __construct()
    {
        $this->_table = 'team_members';
        parent::__construct();
    }

}