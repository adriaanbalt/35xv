<?php
        $input_class_string = 'class="input-medium"';
        echo form_open('register/process', 'class="form-horizontal"'); ?>

         <div class="control-group">
            <?php echo form_error('form_first_name'); ?>
            <label class="control-label">*First Name</label>
            <div class="controls">
      			<?php echo form_input('form_first_name', set_value('form_first_name'), $input_class_string); ?>
            </div>
         </div>

         <div class="control-group">
            <?php echo form_error('form_last_name'); ?>
            <label class="control-label">*Last name</label>
            <div class="controls">
      			<?php echo form_input('form_last_name', set_value('form_last_name'), $input_class_string); ?>
            </div>
         </div>

         <div class="control-group last-group">
            <?php echo form_error('form_email'); ?>
            <label class="control-label">*Email Address</label>
            <div class="controls">
      			<?php echo form_input('form_email', '', $input_class_string); ?>
            </div>
         </div>

         <div class="control-group">
            <?php echo form_error('form_phone'); ?>
            <label class="control-label">*Phone Number</label>
            <div class="controls">
            <?php echo form_input('form_phone', '', $input_class_string); ?>
            </div>
         </div>

         <div class="control-group">
            <label class="control-label">Residence Type Preferred</label>
			<?php echo form_error('form_type'); ?>
            <div class="controls">
            <select  name="form_type" class="input-medium">
              <option value="No Type Selected">Please Select...</option>
              <option value="One Bedroom">One Bedroom from $1,500,000 - $2,100,000</option>
              <option value="Two Bedrooms">Two Bedrooms from $2,500,000 - $4,000,000</option>
              <option value="Three Bedrooms">Three Bedrooms from $4,600,000- $8,950,000</option>
              <option value="Four Bedrooms">Four Bedrooms from $5,650,000 - $9,950,000</option>
            </select>
            </div>
         </div>

    <button type="submit" class="btn btn-inverse btn-large span3 custom-submit">Stay Informed</button>

		<?php echo form_close();?>
