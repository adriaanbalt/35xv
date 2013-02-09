
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
	imageSequences = {};

	loadProgress = new LoadProgress({
		onUpdate: function( val ) {
		//	console.log (" update: ", val );
		},
		onComplete: loadComplete
	});
		imageSequences['building-large'] = new ImageSequence({
			filesPath:'asset/img/building-large/35XV_rotate_08_000{index}.gif',
			imageCount: 100,
			skipImages: 5,
			frameSpeed: 1,
			container: $('#design .sequence'),
			onProgress: function() {
				loadProgress.update();
			}
		});
		imageSequences['residences'] = new ImageSequence({
			filesPath:'asset/img/residences/residences-{index}.jpg',
			imageCount: 2,
			skipImages: 1,
			container: $('#residences-gallery'),
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
			container: $('#clouds .wrapper'),
			onProgress: function() {
				loadProgress.update( this.skipImages );
			}
		});
		for (i in imageSequences) {
			loadProgress.register( Math.ceil((imageSequences[i].imageCount+1)/imageSequences[i].skipImages) );
			imageSequences[i].load();
		}

// TEXT SLANTS
	$('.text-slant').each( function() {
		new TextSlant( $(this), $(this).css('line-height'), 230, 300, 5 );
	});

// DRAW SHAPES
	$('.shape').each( function() {
		var rgb = hexToRgb( $(this).data('color') );
		var c = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + $(this).data('transparency') + ")";
		new DrawShape( $(this).attr('id'), c, $(this).attr('width'), $(this).attr('height'), $(this).data('shape'), $(this).data('overhang') );
	});

// GALLERIES
	residences_gallery = new $.BALT.galleryScroll( $('#residences-gallery') );
	// residences_info = new $.BALT.gallery( $('#residences-gallery-info'), {
	// 	ratioResize: false
	// });
	amenities_gallery = new $.BALT.galleryScroll( $('#amenities-gallery') );

	calculations = new $.BALT.animation.calculations();

//	$('.equalize').equalize();

	gotoSection = {
		'#home': 0,
		'#design': 520,
		'#residences': 2110,
		'#amenities': 3890,
		'#contact': 5210
	}
	if (window.location.hash) {
		settings.startAt = gotoSection[ window.location.hash ];
	};

	function  checkScrollTop() {
		console.log ( "check $('body').scrollTop(): ", $('body').scrollTop(), $(window).scrollTop() );
		clearTimeout( scrollTimeout );
		scrollAnimate.init({
			// data
			animation: animation.getAnim(),	// animation data

			// settings
			maxScroll: 5400,			// max scroll
			useRAF : true,				// set requestAnimationFrame
			tickSpeed: 50,				// set interval (ms) if not using RAF
			scrollSpeed: 15,
			debug: true,				// turn on debug
			tweenSpeed: .3,				// scrollTop tween speed
			startAt: $(window).scrollTop(),	// scrollTop where the experience starts
			container: $('#main'),		// main container

			// callbacks
			onStart: function() {
			},
			onResize: function() {
			},
			onUpdate: function() {
				// if (shouldUpdate == true) {
				// 	nav.updateScroll( scrollAnimate.getScrollTop() / scrollAnimate.getMaxScroll() );
				// }
			}
		});
	}

	function loadComplete() {

		console.log ( "LOAD COMPLETE" );
	//	console.log ( "loadProgress COMPLETE" );
		residences_gallery.init();
	//	residences_info.init();

	//	amenities_gallery.init();
	//	amenities_info.init();
	//
		animation = new $.BALT.keyframes();

		scrollTimeout = setTimeout( checkScrollTop, 500 )

		console.log ( " $('body').scrollTop(): ", $('body').scrollTop(), $(window).scrollTop() );

		scrollAnimate = ScrollAnimator();
	}

})(jQuery);