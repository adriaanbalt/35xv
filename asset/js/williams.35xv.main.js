
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

// LOADING
	var imageSequences = {};

	loadProgress = new LoadProgress({
		onUpdate: function( val ) {
		//	console.log (" update: ", val );
		},
		onComplete: function() {
		//	console.log ( "loadProgress COMPLETE" );
			residences_gallery.init();
			residences_info.init();

			amenities_gallery.init();
		//	amenities_info.init();
		}
	});
	imageSequences['building-large'] = new ImageSequence({
		filesPath:'asset/img/building-large/35XV_rotate_08_000{index}.gif',
		imageCount: 100,
		skipImages: 5,
		container: $('#building-large'),
		onProgress: function() {
			loadProgress.update();
		}
	});
	imageSequences['residences'] = new ImageSequence({
		filesPath:'asset/img/residences/temp-{index}.jpg',
		imageCount: 2,
		skipImages: 1,
		container: $('#residences-gallery .gallery-container'),
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});
	imageSequences['amenities'] = new ImageSequence({
		filesPath:'asset/img/amenities-services/temp-{index}.jpg',
		imageCount: 2,
		skipImages: 1,
		container: $('#amenities-gallery .gallery-container'),
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});
	imageSequences['clouds'] = new ImageSequence({
		filesPath:'asset/img/clouds/cloud-{index}.png',
		imageCount: 6,
		skipImages: 1,
		container: $('#clouds'),
		onProgress: function() {
			loadProgress.update( this.skipImages );
		}
	});
	for (i in imageSequences) {
		loadProgress.register( Math.ceil((imageSequences[i].imageCount+1)/imageSequences[i].skipImages) );
		imageSequences[i].load();
	}
// -----

// TEXT SLANTS
	$('.text-slant').each( function() {
		new TextSlant( $(this), $(this).css('line-height'), 230, 300, 5 );
	});

// DRAW SHAPES
	$('.shape').each( function() {
		new DrawShape( $(this).attr('id'), "rgba(255, 255, 255, 0.75)", $(this).data('width'), $(this).data('height') );
	});


// GALLERIES
	residences_gallery = new $.BALT.gallery( $('#residences-gallery') );
	residences_info = new $.BALT.gallery( $('#residences-gallery-info'), {
		ratioResize: false
	});
	residences_controls = new $.BALT.controls( $( '#residences .gallery-controls'), {
		toControl : [ residences_info, residences_gallery ]
	} );

	amenities_gallery = new $.BALT.gallery( $('#amenities-gallery') );
	amenities_controls = new $.BALT.controls( $( '#amenities .gallery-controls'), {
		toControl : [ amenities_gallery ]
	} );
// -----

	calculations = new $.BALT.animation.calculations();

	$('.equalize').equalize();

//	var keyframes = new $.BALT.animation.keyframes();

//	var parallax = new $.BALT.animation.parallax( $(this), keyframes );

	scroller = new $.BALT.animation.scroller();
		scroller.init({
			// animation data
			animation: null,

			// settings
			maxScroll: 5400,			// max scroll
			useRAF : false,				// set requestAnimationFrame
			scrollSpeed: 15,
			debug: false,				// turn on debug
			tweenSpeed: .3,				// scrollTop tween speed
			skipImages: 1,
			frameSpeed: 1,
			startAt: 0,	// scrollTop where the experience starts
			endAt: 1900,
			container: $('#container'),		// main container
			imageCount: $('#building-large img').length,
			images: $('#building-large img')
		});


})(jQuery);