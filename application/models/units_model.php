<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Units_model extends CI_Model {

	function __construct()
    {
    	$this->load->helper('url');
        parent::__construct();
    }

	public function get_available()
	{
		return array(
             array('Unit', 'Bed/Bath', 'Floor', 'sqft', 'Price', 'Floorplan'),
             array('8A',  '2Bed/2Bath', '8',  '1243', '2700000', anchor('#','view/download')),
             array('9A',  '2Bed/2Bath', '9',  '1234', '2700000', anchor('#','view/download')),
             array('10A', '2Bed/2Bath', '10', '1234', '2700000', anchor('#','view/download')),
             array('11A', '2Bed/2Bath', '11', '1234', '2700000', anchor('#','view/download')),
             array('8B',  '3Bed/2Bath', '8',  '2143', '3700000', anchor('#','view/download')),
             array('9B',  '3Bed/2Bath', '9',  '2134', '3200000', anchor('#','view/download')),
             array('10B', '3Bed/2Bath', '10', '2144', '3300000', anchor('#','view/download')),
             array('11B', '3Bed/2Bath', '11', '2434', '3400000', anchor('#','view/download')),
             array('18A', '2Bed/2Bath', '8',  '1243', '2700000', anchor('#','view/download')),
             array('19A', '2Bed/2Bath', '9',  '1234', '2700000', anchor('#','view/download')),
             array('12A', '2Bed/2Bath', '10', '1234', '2700000', anchor('#','view/download')),
             array('13A', '2Bed/2Bath', '11', '1234', '2700000', anchor('#','view/download')),
             array('18B', '3Bed/2Bath', '18', '2143', '3700000', anchor('#','view/download')),
             array('19B', '2Bed/3Bath', '19', '2134', '3200000', anchor('#','view/download')),
             array('15B', '3Bed/3Bath', '15', '2144', '3300000', anchor('#','view/download')),
             array('7B',  '3Bed/3Bath', '7',  '2434', '3400000', anchor('#','view/download'))
        );
	}
	

}

/* End of file units_model.php */
/* Location: ./application/models/units_model.php */