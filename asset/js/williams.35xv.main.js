
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

	var imageSequences = {};

	// init LoadProgress
	loadProgress = new LoadProgress({
		onUpdate: function( val ) {
		//	console.log (" update: ", val );
		//	nav.setLoadProgress( val*100 );
		},
		onComplete: function() {
		//	console.log ( "loadProgress COMPLETE" );
		//	nav.hideLoadProgress( this.skipImages );
			gallery.init();
		}
	});

	initImageSequences();

	gallery = new $.BALT.gallery( $('.gallery') );

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

	function initImageSequences() {
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
			filesPath:'asset/img/residences/temp-{index}.jpg',
			imageCount: 2,
			skipImages: 1,
			container: $('#amenities-gallery .gallery-container'),
			onProgress: function() {
				loadProgress.update( this.skipImages );
			}
		});

		imageSequences['clouds'] = new ImageSequence({
			filesPath:'asset/img/clouds/cloud-{index}.png',
			imageCount: 5,
			skipImages: 1,
			container: $('#clouds'),
			onProgress: function() {
				loadProgress.update( this.skipImages );
			}
		});

		// register with LoadProgress
		for (i in imageSequences) {
			loadProgress.register( Math.ceil((imageSequences[i].imageCount+1)/imageSequences[i].skipImages) );
			imageSequences[i].load();
		}
	};

})(jQuery);