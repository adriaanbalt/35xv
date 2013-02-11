
/*
@client WILLIAMS NEW YORK
@project 35XV

@author BALT | Adriaan Scholvinck | adriaan@BALT.us
@description kick off the project
@date JANUARY 2013
*/


;(function($) {

	if ( !$.BALT ) {
		$.BALT = {};
	};

	$window = $(window);

// LOADING
	var imageSequences = {};

	loadProgress = new LoadProgress({
		onUpdate: function( val ) {
		//	console.log (" update: ", val );
		},
		onComplete: function() {
			console.log ( "loadProgress COMPLETE" );

			residences_gallery.start();
			amenities_gallery.start();
			spinner = new $.BALT.animation.spinner();
				spinner.init({
					maxScroll: 5400,			// max scroll
					useRAF : true,				// set requestAnimationFrame
					debug: false,				// turn on debug
					tweenSpeed: .3,				// scrollTop tween speed
					skipImages: 1,
					frameSpeed: 1,
					startAt: 300,	// scrollTop where the experience starts
					endAt: 1900,
					container: $('#container'),		// main container
					imageCount: $('#building-large img').length,
					sequence: imageSequences['building-large']
				});
		}
	});
	
	imageSequences['building-large'] = new ImageSequence({
		filesPath:'asset/img/building-large/35XV_ROTATE_2013_2_11_000{index}.gif',
		imageCount: 100,
		skipImages: 5,
		container: $('#building-large'),
		onProgress: function() {
			loadProgress.update();
		}
	});
	imageSequences['clouds'] = new ImageSequence({
		filesPath:'asset/img/clouds/cloud-{index}.png',
		imageCount: 6,
		skipImages: 1,
		container: $('#clouds .wrapper'),
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});
	for (i in imageSequences) {
		loadProgress.register( Math.ceil((imageSequences[i].imageCount+1)/imageSequences[i].skipImages) );
		imageSequences[i].load();
	}

	$('.text-slant').each( function() {
		new TextSlant( $(this), $(this).css('line-height'), 230, 300, 5 );
	});
	$('.shape').each( function() {
		var rgb = hexToRgb( $(this).data('color') );
		var c = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + $(this).data('transparency') + ")";
		new DrawShape( $(this).attr('id'), c, $(this).attr('width'), $(this).attr('height'), $(this).data('shape'), $(this).data('overhang') );
	});

	$('.equalize').equalize();

	calculations = new $.BALT.animation.calculations();

	residences_gallery = new $.BALT.galleryScroll( $('#residences-gallery'), { 
		onProgress: function() {
			loadProgress.update();
		}
	});
	amenities_gallery = new $.BALT.galleryScroll( $('#amenities-gallery'), { 
		onProgress: function() {
			loadProgress.update();
		}
	});

	scroller = new $.BALT.animation.scroller({
		register : [ residences_gallery, amenities_gallery ]
	});


//	var keyframes = new $.BALT.animation.keyframes();

//	var parallax = new $.BALT.animation.parallax( $(this), keyframes );


})(jQuery);