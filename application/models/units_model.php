<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Units_model extends MY_Model {

    function __construct()
    {
        $this->_table = 'units';
        $this->load->helper('url');
        setlocale(LC_MONETARY, 'en_US');
        parent::__construct();
    }

    public function get_available()
    {

        $units_table = array( array('Unit', 'Bed/Bath', 'Floor', 'sqft', 'Price', 'Floorplan') );     
        $units = $this->get_all();
        
        foreach ($units as $k => $u) {

            // Remove decimal point and zero from whole numbers.
            // ie 2.0 Bedrooms becomes 2 Bedrooms
            if ( $this->_endswith($u->bedrooms,  '.0') ) { $u->bedrooms  = substr($u->bedrooms, 0, -2); };
            if ( $this->_endswith($u->bathrooms, '.0') ) { $u->bathrooms = substr($u->bathrooms, 0, -2); };
            switch ($u->unit_status_id) {
                case '2':
                    $u->price_string = 'Contract Out';
                    break;
                case '3':
                    $u->price_string = 'Sold';
                    break;                
                default:
                    $u->price_string = money_format('%.0n', $u->price);
                    break;
            }

            array_push($units_table, array(
                $u->unit_number,
                $u->bedrooms.'Bed/'.$u->bathrooms.'Bath',
                $u->floor,
                number_format($u->sqft),
                $u->price_string,
                anchor('#modal-plan-unique'.$u->id, 'view', array('data-image' => $u->floorplan_image_path, 'class' => 'floorplan-modal')).'/'. anchor($u->floorplan_pdf_path,'download', array('target' => '_blank'))
                )
            );
        }
        return $units_table;
    }
}

/* End of file units_model.php */
/* Location: ./application/models/units_model.php */