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
             array('8A',  '2Bed/2Bath', '8',  '1,243', '$2,700,000', anchor('#modal-plan-unique16', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('9A',  '2Bed/2Bath', '9',  '1,234', '$2,700,000', anchor('#modal-plan-unique15', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('10A', '2Bed/2Bath', '10', '1,234', '$2,700,000', anchor('#modal-plan-unique14', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('11A', '2Bed/2Bath', '11', '1,234', '$2,700,000', anchor('#modal-plan-unique13', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('8B',  '3Bed/2Bath', '8',  '2,143', '$3,700,000', anchor('#modal-plan-unique12', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('9B',  '3Bed/2Bath', '9',  '2,134', '$3,200,000', anchor('#modal-plan-unique11', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('10B', '3Bed/2Bath', '10', '2,144', '$3,300,000', anchor('#modal-plan-unique10', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('11B', '3Bed/2Bath', '11', '2,434', '$3,400,000', anchor('#modal-plan-unique9', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('18A', '2Bed/2Bath', '8',  '1,243', '$2,700,000', anchor('#modal-plan-unique8', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('19A', '2Bed/2Bath', '9',  '1,234', '$2,700,000', anchor('#modal-plan-unique7', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('12A', '2Bed/2Bath', '10', '1,234', '$2,700,000', anchor('#modal-plan-unique6', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('13A', '2Bed/2Bath', '11', '1,234', '$2,700,000', anchor('#modal-plan-unique5', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('18B', '3Bed/2Bath', '18', '2,143', '$3,700,000', anchor('#modal-plan-unique4', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('19B', '2Bed/3Bath', '19', '2,134', '$3,200,000', anchor('#modal-plan-unique3', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature3.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('15B', '3Bed/3Bath', '15', '2,144', '$3,300,000', anchor('#modal-plan-unique2', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature2.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank'))),
             array('7B',  '3Bed/3Bath', '7',  '2,434', '$3,400,000', anchor('#modal-plan-unique1', 'view', array('data-image' => 'asset/img/featured-plan/plan-feature1.png', 'class' => 'floorplan-modal') ).'/'. anchor('#pdflink','download', array('target' => '_blank')))
        );
    }


}

/* End of file units_model.php */
/* Location: ./application/models/units_model.php */