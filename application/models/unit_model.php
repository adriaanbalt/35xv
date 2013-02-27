<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Unit_model extends MY_Model {

	function __construct()
    {
        $this->_table = 'units';
        $this->load->helper('url');
    }

    // public function get_all()
    // {
    //     return $query = $this->db->get('units');
    // }


	public function get_available()
	{
		return array(
             array('Unit', 'Bed/Bath', 'Floor', 'sqft', 'Price', 'Floorplan'),
             array('8A',  '2Bed/2Bath', '8',  '1,243', '$2,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('9A',  '2Bed/2Bath', '9',  '1,234', '$2,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('10A', '2Bed/2Bath', '10', '1,234', '$2,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('11A', '2Bed/2Bath', '11', '1,234', '$2,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('8B',  '3Bed/2Bath', '8',  '2,143', '$3,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('9B',  '3Bed/2Bath', '9',  '2,134', '$3,200,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('10B', '3Bed/2Bath', '10', '2,144', '$3,300,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('11B', '3Bed/2Bath', '11', '2,434', '$3,400,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('18A', '2Bed/2Bath', '8',  '1,243', '$2,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('19A', '2Bed/2Bath', '9',  '1,234', '$2,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('12A', '2Bed/2Bath', '10', '1,234', '$2,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('13A', '2Bed/2Bath', '11', '1,234', '$2,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('18B', '3Bed/2Bath', '18', '2,143', '$3,700,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('19B', '2Bed/3Bath', '19', '2,134', '$3,200,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('15B', '3Bed/3Bath', '15', '2,144', '$3,300,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('7B',  '3Bed/3Bath', '7',  '2,434', '$3,400,000', anchor('#', 'view', array('data-floorplan' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'modal floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank')))
        );
	}
	

}

/* End of file units_model.php */
/* Location: ./application/models/units_model.php */