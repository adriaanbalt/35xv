<h4><?php echo count($inquiries); ?> Total respondents. <?php echo $inquiries_24hours; ?> in the past 24 hours. <?php echo $inquiries_week; ?> in the past week.</h4>

<?php

$this->table->set_heading('ID','Title','First Name', 'Last Name', 'Email','Phone','Address','City','State','Zip','Country','Source','Type','Time of inquiry');

echo $this->table->generate($inquiries);

?>

