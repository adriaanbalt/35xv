<?php
        $input_class_string = 'class="input-medium"';
        echo form_open('register/process', 'class="form-horizontal"'); ?>

         <div class="control-group last-group">
            <?php echo form_error('form_email'); ?>
            <label class="control-label">*Email Address</label>
            <div class="controls">
      			<?php echo form_input('form_email', '', $input_class_string); ?>
            </div>
         </div>
    
        <button type="submit" class="btn btn-inverse btn-large span3 custom-submit">Stay Informed</button>

    <?php echo form_close();?>
