<?php

		// use this to add attrs to the inputs.
		// input-medium is for twitter bootstrap styling - but do change accordingly
		$input_class_string = 'class="input-medium input35xv"';

		echo form_open('register/process'); ?>

		<div class='clearfix'>
		 <div class="control-group clearfix">
			<label class="control-label">Title</label>
			<div class="controls">
			<select name="form_title" class="input-small">
			  <option value="Mr.">Mr.</option>
			  <option value="Mrs.">Mrs.</option>
			  <option value="Ms.">Ms.</option>
			</select>
			</div>
		 </div>

		 <div class="control-group clearfix">
			<div class='left-padding'></div>
			<label class="control-label">First Name * </label>
				<?php echo form_error('form_first_name'); ?>
			<div class="controls">
				<?php echo form_input('form_first_name', set_value('form_first_name'), $input_class_string); ?>
			</div>
		 </div>

		 <div class="control-group clearfix">
			<label class="control-label">Last name * </label>
				  <?php echo form_error('form_last_name'); ?>
			<div class="controls">
				  <?php echo form_input('form_last_name', set_value('form_last_name'), $input_class_string); ?>
			</div>
		 </div>

		 <div class="control-group clearfix">
			<label class="control-label">Email Address * </label>
				<?php echo form_error('form_email'); ?>
			<div class="controls">
				  <?php echo form_input('form_email', '', $input_class_string); ?>
			</div>
		 </div>

		 <div class="control-group clearfix">
			<label class="control-label">Phone Number *</label>
			<?php echo form_error('form_phone'); ?>
			<div class="controls">
			<?php echo form_input('form_phone', '', $input_class_string); ?>
			</div>
		 </div>

		 <div class="control-group clearfix">
			<label class="control-label">Address *</label>
				  <?php echo form_error('form_address'); ?>
			<div class="controls">
				  <?php echo form_input('form_address', '', $input_class_string); ?>
			</div>
		  </div>

		 <div class="control-group clearfix">
			<label>City</label>
				  <?php echo form_error('form_city'); ?>
			<div class="controls">
				  <?php echo form_input('form_city', '', $input_class_string); ?>
			</div>
		 </div>

		 <div class="control-group clearfix">
			<label class="control-label">State</label>
				  <?php echo form_error('form_state'); ?>
			<div class="controls">
				  <?php echo form_input('form_state', '', $input_class_string); ?>
			</div>
		  </div>

		 <div class="control-group clearfix">
			<label class="control-label">Zip</label>
				  <?php echo form_error('form_zip'); ?>
			<div class="controls">
				  <?php echo form_input('form_zip', '', $input_class_string); ?>
			</div>
		 </div>

		 <div class="control-group clearfix">
			<label class="control-label">Country</label>
				  <?php echo form_error('form_country'); ?>
			<div class="controls">
				  <?php echo form_input('form_country', '', $input_class_string); ?>
			</div>
		 </div>

		 <div class="control-group clearfix">
			<label class="control-label">Where did you hear about us?</label>
				  <?php echo form_error('form_source'); ?>
			<div class="controls">
				  <?php echo form_input('form_source', '', $input_class_string); ?>
			</div>
		 </div>

		 <div class="control-group clearfix">
			<label class="control-label">Residence Type Preferred</label>
			<?php echo form_error('form_type'); ?>
			<div class="controls">
				<div class='dropdown'>
					<span class='current-value'>Please Select...</span>
					<div class='values'>
						<div class='inner'>
							<ol>
								<li data-value="No Type Selected" class='active'><span class='checked-icon'></span>Please Select...</li>
								<li data-value="One Bedroom"><span class='checked-icon'></span>One Bedroom from $1,500,000 - $2,100,000</li>
								<li data-value="Two Bedrooms"><span class='checked-icon'></span>Two Bedrooms from $2,500,000 - $4,000,000</li>
								<li data-value="Three Bedrooms"><span class='checked-icon'></span>Three Bedrooms from $4,600,000- $8,950,000</li>
								<li data-value="Four Bedrooms"><span class='checked-icon'></span>Four Bedrooms from $5,650,000 - $9,950,000</li>
							</ol>
						</div>
					</div>
					<select name="form_type" class="input-medium hidden">
						<option value="No Type Selected" selected>Please Select...</option>
						<option value="One Bedroom">One Bedroom from $1,500,000 - $2,100,000</option>
						<option value="Two Bedrooms">Two Bedrooms from $2,500,000 - $4,000,000</option>
						<option value="Three Bedrooms">Three Bedrooms from $4,600,000- $8,950,000</option>
						<option value="Four Bedrooms">Four Bedrooms from $5,650,000 - $9,950,000</option>
					</select>
				</div>
			</div>
		 </div>
	 </div>

	<div class="control-group clearfix">
		<div class="controls">
		<button type="submit" class="btn btn-small">SUBMIT</button>
		</div>
	</div>
	<div class="control-group clearfix">
		<p>* Required Fields</p>
	</div>

<?php echo form_close();?>