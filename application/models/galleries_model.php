<?php if (! defined('BASEPATH')) exit('No direct script access');

class Galleries_model extends MY_Model {

	function __construct()
    {
        $this->_table = 'galleries';
        parent::__construct();
    }

    function get_with_media($id)
    {
        $query = $this->db->get_where($this->_table, array('id' => $id));
        $gallery = $query->row();
        $media_ids = explode(",",$gallery->media_ids);
            foreach ($media_ids as $key => $media_id) {
                $query = $this->db->get_where('media', array('id' => $media_id));
                $gallery->media[$key] = $query->row();
            }
        return $gallery;
    }

}