
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

	loader = new $.BALT.loader( $('#loader'), {
		onComplete : function() {
			$('#main').css( { 
				opacity: 1,
				filter: 'alpha(opacity=' + 100 + ')', /* For IE8 and earlier */
				transition: 'all 1s'
			});
		}
	});

	var imageSequences = {};

	loadProgress = new LoadProgress({
		onUpdate: function( val ) {
			loader.update( val * 100 );
		},
		onComplete: function() {
			console.log ( "loadProgress COMPLETE" );
			


			residences_gallery.start();
			amenities_gallery.start();
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

			scroller = new $.BALT.animation.scroller({
				register : [ residences_gallery, amenities_gallery, spinner ]
			});
		}
	});
	
	imageSequences['building-large'] = new $.BALT.imageSequence({
		filesPath:'asset/img/building-large/35XV_ROTATE_2013_2_11_000{index}.gif',
		imageCount: 100,
		skipImages: 5,
		container: $('#building-large'),
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});
	imageSequences['clouds'] = new $.BALT.imageSequence({
		filesPath:'asset/img/clouds/cloud-{index}.png',
		imageCount: 6,
		skipImages: 1,
		container: $('#clouds .wrapper'),
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});

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

	spinner = new $.BALT.animation.spinner();

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

	loadProgress.register( residences_gallery.settings.slideCount );
	loadProgress.register( amenities_gallery.settings.slideCount );

	for (i in imageSequences) {
		loadProgress.register( Math.ceil((imageSequences[i].imageCount+1)/imageSequences[i].skipImages) );
		imageSequences[i].load();
	}

})(jQuery);