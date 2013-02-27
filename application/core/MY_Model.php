<?php if (! defined('BASEPATH')) exit('No direct script access');

class MY_Model extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }

    function get($id) {
        $query = $this->db->get_where($this->_table, array('id' => $id));
        return $query->row();
    }

    function get_all($asArray = FALSE) {
        $this->db->order_by('id', 'asc');
        $query = $this->db->get($this->_table);
        if ($asArray) { return $query->result_array(); }
        else { return $query->result(); }
    }

    function get_all_by($order_by, $order_type) {
        $this->db->order_by($order_by, $order_type);
        $query = $this->db->get($this->_table);
        return $query->result();
    }

    function get_by_csv($id_key, $csv_ids) {
        $result = array();
        if($csv_ids):
            $ids = explode(",",$csv_ids);
            foreach ($ids as $key => $id) {
                $query = $this->db->get_where($this->_table, array($id_key => $id));
                $result[$key] = $query->row();
            }
            $result_object = (object) $result;
        else:
            $result_object = NULL;
        endif;

        return $result_object;
    }

    function get_by_csv_array($id_key, $csv_ids) {
        $result = array();
        if($csv_ids):
            $ids = explode(",",$csv_ids);
            foreach ($ids as $key => $id) {
                $query = $this->db->get_where($this->_table, array($id_key => $id));
                $result[$key] = $query->row();
            }
            $result_object = $result;
        else:
            $result_object = NULL;
        endif;

        return $result_object;
    }

    function get_by_column($key, $value) {
        $query = $this->db->get_where($this->_table, array($key => $value));
        return $query->result();
    }

    function get_row_by_column($key, $value) {
        $query = $this->db->get_where($this->_table, array($key => $value));
        return $query->row();
    }

    function insert_row($form_data) {
        $this->db->insert($this->_table, $form_data);

        if ($this->db->affected_rows() == '1')
        {
            return $this->db->insert_id();
        }

        return FALSE;
    }

    function update_row($form_data)
    {
        $this->db->where('id', $form_data['id']);
        $this->db->update($this->_table, $form_data);

        if ($this->db->affected_rows() == '1')
        {
            return TRUE;
        }

        return FALSE;
    }


    function remove_row($id_key, $id)
    {
        $this->db->where($id_key, $id);
        $this->db->delete($this->_table);

        if ($this->db->affected_rows() == '1')
        {
            return TRUE;
        }

        return FALSE;
    }

    function _sluggit($name) {
        $slug = strtolower($name);
        $slug = preg_replace('/\s+/', '-', $slug);
        $slug = preg_replace('/\./', '', $slug);
        return $slug;
    }

    function _endswith($string, $test) {
        $strlen = strlen($string);
        $testlen = strlen($test);
        if ($testlen > $strlen) return false;
        return substr_compare($string, $test, -$testlen) === 0;
    }

}