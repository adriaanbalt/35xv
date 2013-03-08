
<div id='loader'>
	<img src='asset/img/home/logo-large.png' class='logo'/>
	<p>LOADING...</p>
	<div class='progress'>
		<div class='bar'></div>
	</div>
</div>

<div id='scroller' unselectable='on'>
	<div id='scrubber'></div>
</div>

<nav>
	<div class='wrapper'>
		<ul>
			<li><a href='#home' class='home'>SKYMARK</a></li>
			<li><a href='#design' class='design'>DESIGN</a></li>
			<li><a href='#residences' class='residences'>RESIDENCES</a></li>
			<li><a href='#floor-plans' class='floor-plans'>FLOOR PLANS</a></li>
			<li><a href='#services-amenities' class='services-amenities'>SERVICES &AMP; AMENITIES</a></li>
			<li><a href='#neighborhood' class='neighborhood'>NEIGHBORHOOD</a></li>
			<li><a href='#team' class='team'>TEAM</a></li>
			<?php if ($site_data['press_active'] == 1) {
				echo '<li><a href="#press" class="press">PRESS</a></li>';
			} ?>
			<li><a href='#contact' class='contact'>CONTACT</a></li>
		</ul>
	</div>
</nav>

<div id='main'>

<!-- home -->
<section class="home">
	<div class="content-box center">
		<img src='asset/img/home/logo-large.png' class='logo'/>
		<p>A SKYMARK</p>
		<img src='asset/img/home/home.png' id='skyline-img'/>
	</div>
</section>

<div id='container' class='wrapper'>

<!-- design -->
	<section class="design grid-whole">
		<h2>DESIGN</h2>
		<div class='equalize'>
			<div class="grid-two-thirds">
				<div class="padded-inner content-box center">
					<!-- spinning building -->
					<div id='building-large' class='spin'>
					</div>

				</div>
			</div>
			<div class="grid-third content-box" id='design-info'>
				<div class="padded-inner">
					<div class='building-section zero'>
						<div class="padded-inner"></div>
					</div>
					<div class='building-section one'>
						<!-- <span class='carat-left'></span><h1>RESIDENTIAL TOWER</h1> -->
					</div>
					<div class='building-section two'>
						<!-- <span class='carat-left'></span><h1>SEVENTH FLOOR AMENITIES</h1> -->
					</div>
					<div class='building-section three'>
						<!-- <span class='carat-left'></span><h1>COMMERCIAL BASE</h1> -->
					</div>
					<div class='building-section'>
						<!-- <span class='carat-left'></span><h1>RESIDENTIAL ENTRANCE</h1> -->
					</div>
				</div>
			</div>
		</div>
	</section>

<!-- residences -->
	<section class="residences grid-whole">
		<h2>RESIDENCES</h2>
		<div class="grid-whole">
			<div id='residences-gallery' class='gallery-scroll'>
				<div class='gallery-container clearfix'>
					<?php foreach ($residences_gallery->media as $k => $m)
					{
						echo '<div class="slide">';
							echo '<div class="layered grid-whole">';
								echo '<div class="grid-two-thirds">&nbsp;</div>';
								echo '<div class="grid-third padded-inner">';
									echo '<div class="copy">';
										echo heading($m->media_title, 3);
										echo '<div class="text-slant" data-boxWidth="70" data-increment="5">';
											echo '<span>'.$m->media_description.'</span>';
										echo '</div>';
									echo '</div>';
								echo '<canvas id="shape-'.$k.'" class="shape over" data-shape="parallelogram" width="360" height="350" data-color="#fff" data-transparency=".75" data-overhang="85"/>';
								echo '</div>';
							echo '</div>';

							echo img($m->file_path);
							echo '<canvas id="shape-'.$k.'-under" class="shape under shadow" data-shape="parallelogram" width="843" height="640" data-color="#fff" data-transparency="1" data-overhang="0"/>';
						echo '</div>';
					}
					?>

				</div>
			</div>
		</div>
	</section>

<!-- unit-availability -->
	<?php echo $unit_availability; ?>

<!-- featured-plan -->
	<section class="featured-plan grid-whole">
		<h2>FEATURED<br>PLAN</h2>
		<div class="padded-inner content-box center">
			<div class='feature'>

				<?php echo anchor($featured_unit->floorplan_pdf_path,img($featured_unit->floorplan_image_path), array('target' => '_blank') ); ?>

			</div>
			<div class='list'>
				<ul>
				</ul>
			</div>
		</div>
		<div id='building-medium'>
			<img src="asset/img/building-line-medium.png"/>
		</div>
	</section>

<!-- amenities-services -->
	<section class="services-amenities grid-whole">
		<h2>SERVICES &AMP;<br />AMENITIES</h2>
		<div class="content-box">
			<div id='building-small'>
				<img src="asset/img/building-line-small.png"/>
			</div>
			<!-- gallery -->
			<div id='amenities-gallery' class='gallery-scroll'>
				<div class='gallery-container clearfix'>
					<?php foreach ($amenities_gallery->media as $k => $m)
					{
						echo '<div class="slide">';
							echo '<div class="layered grid-whole">';
								echo '<div class="grid-two-thirds">&nbsp;</div>';
								echo '<div class="grid-third padded-inner">';
									echo '<div class="copy">';
										echo heading($m->media_title, 3);
										echo '<div class="text-slant" data-boxWidth="70" data-increment="5">';
											echo '<span>'.$m->media_description.'</span>';
										echo '</div>';
									echo '</div>';
								echo '<canvas id="shape-amenities-'.$k.'" class="shape over" data-shape="parallelogram" width="360" height="350" data-color="#fff" data-transparency=".75" data-overhang="85"/>';
								echo '</div>';
							echo '</div>';
							echo img($m->file_path);
							echo '<canvas id="shape-amenties-'.$k.'-under" class="shape under shadow" data-shape="parallelogram" width="743" height="640" data-color="#fff" data-transparency="1" data-overhang="0"/>';
						echo '</div>';
					}
					?>
				</div>
			</div>
		</div>
	</section>

<!-- neighborhood -->
	<section class="neighborhood grid-whole">
		<h2>NEIGHBORHOOD</h2>
		<div class="content-box center">
			<?php echo img($site_data['neighborhood_image_path']); ?>
			<canvas id="shape-neighborhood-under" class="shape under shadow" data-shape="parallelogram" width="835" height="440" data-color="#fff" data-transparency="1" data-overhang="0"/>';
		</div>
	</section>

<!-- team -->
	<section class="team grid-whole">
		<h2>TEAM</h2>
		<div class="padded-inner content-box">
			<?php foreach ($team_members as $k => $m) {

				switch ($k) {
					case '0':
						$extra_classes = "clearfix border-bottom";
						$logo = '';
						$boxWidth = 90;
						$videoID = '61196658';
					break;
					case '1':
						$extra_classes = "clearfix border-bottom descriptionLargeWidth";
						$logo = '<div id="alchemy-logo"></div>';
						$boxWidth = 40;
					break;
					case '2':
						$extra_classes = "clearfix border-bottom";
						$logo = '';
						$boxWidth = 60;
						$videoID = '61211465';
					break;
					case '3':
						$extra_classes = "clearfix border-bottom";
						$logo = '';
						$boxWidth = 120;
						$videoID = '61209565';
					break;
					case '4':
						$extra_classes = "clearfix halfwidth last";
						$logo = '';
						$boxWidth = 18;
					break;
					default:
						$extra_classes = "clearfix";
					break;
				}

				echo '<div class="team-member '.$extra_classes.'">';
					if ( $m->video_path != "" ){
					// Let's show a video is we have one set
						// echo '<video id="'.$m->title.'-vid" class="video-js vjs-default-skin" controls preload="auto" width="445" height="260" data-setup="{}">';
						// 	echo '<source src="'.$m->video_path.'.ogv" type="video/ogg">';
						// 	echo '<source src="'.$m->video_path.'.mp4" type="video/mp4">';
						// 	echo '<source src="'.$m->video_path.'.webm" type="video/webm">';
						// 	echo '<source src="'.$m->video_path.'.m4v" type="video/m4v">';
						// 	echo '<p>Video unavailable on your browser.</p>';
						// echo '</video>';
						echo '<iframe src="http://player.vimeo.com/video/' . $videoID . '" width="445" height="255" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
					} elseif ($m->image_path != "") { 
					// no video? let's try to show an image
						echo img($m->image_path); 
					} else {
					// we don't have an image or a video so show nothing
					}
					echo $logo;
					echo '<div class="description">';
						echo heading($m->title,4);
							$description_with_shape = '<p class="text-slant" data-boxWidth="'. $boxWidth .'" data-increment="6">'. $m->description .'</p>';
							echo $description_with_shape;
						echo '</p>';
					echo '</div>';
				echo '</div>';

		} ?>


		</div>
	</section>


<!-- press -->
<?php if ($site_data['press_active'] == 1): ?>

	<section class="press grid-whole">
		<h2>PRESS</h2>
		<div class="padded-inner content-box clearfix">
			<ul>
				<?php foreach ($press_articles as $k => $article) {
					echo '<li>';
						echo heading($article->content, 5);
						echo '<p class="source">'.$article->source.'</p>';
						echo '<p class="date">'.$article->date.'</p>';
					echo '</li>';
				}
				?>
			</ul>
		</div>
	</section>

<?php endif; ?>

<!-- contact -->
	<?php echo $contact_form; ?>

<!-- footer -->
	<section class="address grid-whole">
		<hr>
		<hr>
		<div class='clearfix'>
			<div class='addy'>
				<span><?php echo $site_data['phone']; ?></span>
				<span class='pipe'></span>
				<span><?php echo $site_data['address']; ?></span>
			</div>
			<div class='sales'>
			<span><b><?php echo $site_data['sales_title']; ?></b></span>
			<span><?php echo $site_data['sales_address']; ?></span>
			</div>
			<div class='border-bottom last'>
			<span><?php echo $site_data['developer_credit']; ?></span>
			</div>
		</div>
		<p class='copyright'>&copy; <?php echo date('Y'); ?></p>
		<div class='terms'><p>LEGAL DISCLAIMER</p><p>On behalf of AGA 15th Street LL C, Alchemy Properties Inc. is proud to be the Exclusive Sales Broker of The 35XV Condominium. Co-Brokers are welcomed and encouraged. The complete terms are in an Offering Plan available from the sponsor. New York State Attorney General File No. CD12-0108. Sponsor reserves the right to make changes in accordance with the Offering Plan. All dimensions and illustrations are approximate. Noted dimensions reflect interior dimensions of space. Please consult the Offering Plan for more detail.</p></div>
	</section>

</div>
<!-- end CONTAINER -->


<!-- background -->
<div id='background'>
	<img src="asset/img/clouds/cloud-0.png" class='cloud' id='cloud0'>
</div>

</div>
<!-- end MAIN -->

