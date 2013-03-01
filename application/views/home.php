
<div id='loader'>
	<img src='asset/img/home/logo-large.png' class='logo'/>
	<p>LOADING...</p>
	<div class='progress'>
		<div class='bar'></div>
	</div>
</div>

<div id='scroller'>
	<div id='scrubber'></div>
</div>

<nav>
	<div class='wrapper'>
		<ul>
			<li><a href='#home'>SKYMARK</a></li>
			<li><a href='#design'>DESIGN</a></li>
			<li><a href='#residences'>RESIDENCES</a></li>
			<li><a href='#floor-plans'>FLOOR PLANS</a></li>
			<li><a href='#services-amenities'>SERVICES &AMP; AMENITIES</a></li>
			<li><a href='#neighborhood'>NEIGHBORHOOD</a></li>
			<li><a href='#team'>TEAM</a></li>
			<li><a href='#press'>PRESS</a></li>
			<li><a href='#contact'>CONTACT</a></li>
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
						<span class='carat-left'></span><h1>RESIDENTIAL TOWER</h1>
					</div>
					<div class='building-section two'>
						<span class='carat-left'></span><h1>SEVENTH FLOOR AMENITIES</h1>
					</div>
					<div class='building-section three'>
						<span class='carat-left'></span><h1>COMMERCIAL BASE</h1>
					</div>
					<div class='building-section'>
						<span class='carat-left'></span><h1>RESIDENTIAL ENTRANCE</h1>
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
							echo '<canvas id="shape-'.$k.'-under" class="shape under shadow" data-shape="parallelogram" width="845" height="640" data-color="#fff" data-transparency="1" data-overhang="0"/>';
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
							echo '<canvas id="shape-amenties-'.$k.'-under" class="shape under shadow" data-shape="parallelogram" width="745" height="640" data-color="#fff" data-transparency="1" data-overhang="0"/>';
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
						$shape = '<p class="text-slant" data-boxWidth="90" data-increment="6">';
					break;
					case '1':
						$extra_classes = "clearfix border-bottom rightside descriptionLargeWidth";
						$shape = '<p class="text-slant" data-boxWidth="40" data-increment="6">';
					break;
					case '2':
						$extra_classes = "clearfix border-bottom rightside";
						$shape = '<p class="text-slant" data-boxWidth="90" data-increment="6">';
					break;
					case '3':
						$extra_classes = "clearfix border-bottom rightside descriptionMediumWidth";
						$shape = '<p class="text-slant" data-boxWidth="120" data-increment="6">';
					break;
					case '4':
						$extra_classes = "clearfix rightside halfwidth";
						$shape = '<p class="text-slant" data-boxWidth="18" data-increment="6">';
					break;
					default:
						$extra_classes = "clearfix";
					break;
				}

				echo '<div class="team-member '.$extra_classes.'">';
					if ($m->image_path != "") { 
						echo img($m->image_path);
					}
					// if ( $m->video_path != "" ){
					// 	echo '<video id="fxfowle" class="video-js vjs-default-skin" controls preload="auto" width="445" height="260" data-setup="{}">
					// 			<source src="asset/video/FXFowle.ogv" type="video/ogg">
					// 			<source src="asset/video/FXFowle.mp4" type="video/mp4">
					// 			<p>Your browser does not support the video tag.</p>
					// 		</video>';
					// }
					echo '<div class="description">';
						echo heading($m->title,4);
						echo $shape;
							echo $m->description;
						echo '</p>';
					echo '</div>';
				echo '</div>';

		} ?>


		</div>
	</section>

<!-- design-team -->
	<section class="design-team grid-whole">
		<h2>DESIGN<br>TEAM</h2>
		<div class="grid-whole">
			<div class="grid-half">
				<div class="padded-inner-sides content-box center">
					<div class='video-box'>
						<video id="fxfowle" class="video-js vjs-default-skin" controls preload="auto" width="445" height="260" data-setup="{}">
							<source src="asset/video/FXFowle.ogv" type='video/ogg'>
							<source src="asset/video/FXFowle.mp4" type='video/mp4'>
							<p>Your browser does not support the video tag.</p>
						</video>
					</div>
					<h4>FX FOWLE</h4>
				</div>
			</div>
			<div class="grid-half">
				<div class="padded-inner"></div>
			</div>
		</div>
		<div class="grid-whole">
			<div class="grid-half">
				<div class="padded-inner"></div>
			</div>
			<div class="grid-half">
				<div class="padded-inner-sides content-box center">
					<div class='video-box'>
						<video id="bmo" class="video-js vjs-default-skin" controls preload="auto" width="445" height="260" data-setup="{}">
							<source src="asset/video/BNO.ogv" type='video/ogg'>
							<source src="asset/video/BNO.mp4" type='video/mp4'>
							<p>Your browser does not support the video tag.</p>
						</video>
					</div>
					<h4>BENJAMIN<br>NORIEGA&#45;ORTIZ</h4>
				</div>
			</div>
		</div>
	</section>

<!-- press -->
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
			<SPAN><?php echo $site_data['sales_address']; ?></SPAN>
			</div>
			<div class='border-bottom last'>
			<span><?php echo $site_data['developer_credit']; ?></span>
			</div>
		</div>
		<p class='copyright'>&copy; <?php echo date('Y'); ?></p>
	</section>

</div>

<!-- background -->
	<div id='background'>
		<img src="asset/img/clouds/cloud-0.png" class='cloud' id='cloud0'>
	</div>

</div>
<!-- end MAIN -->

