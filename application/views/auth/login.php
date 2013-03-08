	<h4>Please login with your email address and password below.</h4>
  <br />
	<div id="infoMessage"><?php echo $message;?></div>
    <?php echo form_open("auth/login", 'class="form-horizontal"');?>
        <div class="control-group">
          <label class="control-label" for="inputEmail">Email address</label>
          <div class="controls">
            <div class="input-prepend">
              <span class="add-on"><i class="icon-envelope"></i></span>
              <input class="span9" id="inputEmail" name="email" type="text">
            </div>
          </div>
        </div>
        
        <div class="control-group">
          <label class="control-label" for="inputPass">Password</label>
          <div class="controls">
            <div class="input-prepend">
              <span class="add-on"><i class="icon-eye-close"></i></span>
              <input class="span9" id="inputPass" name="password" type="password">
            </div>
          </div>
        </div>
	      <?php echo form_hidden('remember', '0', FALSE);?>

<br />
      <?php echo form_submit('submit', 'Login', 'class="btn offset2"');?>

    <?php echo form_close();?>
