
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
		//	residences_info.init();

		//	amenities_gallery.init();
		//	amenities_info.init();
		}
	});
	imageSequences['building-large'] = new ImageSequence({
		filesPath:'asset/img/building-large/35XV_rotate_08_000{index}.gif',
		imageCount: 100,
		skipImages: 5,
		container: $('#design .sequence'),
		onProgress: function() {
			loadProgress.update();
		}
	});
	imageSequences['residences'] = new ImageSequence({
		filesPath:'asset/img/residences/residences-{index}.jpg',
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
		container: $('#clouds .wrapper'),
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
			imageCount: $('#design .sequence img').length,
			images: $('#design .sequence img')
		});

	var animation = [
			{
				id: 'home',
				startAt: 0,
				endAt: 299,
				ease: TWEEN.Easing.Linear.EaseNone,
				onInit: function( anim ) {
				},
				onProgress: function( progress ) {
					console.log ( "home onProgress: ", progress );
				}
			},
			{
				id: 'design',
				startAt: 300,
				endAt: 2000,
				ease: TWEEN.Easing.Linear.EaseNone,
				sequence: imageSequences['building-large'],
				onInit: function( anim ) {
				},
				onProgress: function( progress ) {
					var endFrame = (this.sequence.imageCount/this.sequence.skipImages) * this.sequence.frameSpeed,
					toFrame = Math.floor(progress*endFrame) % this.sequence.imageCount;
					//showImageAt( toFrame );
					console.log ( "design onProgress: ", progress, toFrame );
					var image = settings.images[ index ];
				}
			},
			{
				id: 'residences',
				startAt: 2001,
				endAt: 3000,
				ease: TWEEN.Easing.Linear.EaseNone,
				onInit: function( anim ) {
				},
				onProgress: function( progress ) {
					console.log ( "residences onProgress: ", progress );
				}
			}
	];
		var showImageAt = function( index ) {
			if (index == currentIndex) return false;

			var image = settings.images[ index ];

			if (image) {
				hideImageAt( currentIndex );
				currentIndex = index;
				image.style.display = 'block';
			} else {
			}
		};

	if (window.location.hash) {
		settings.startAt = gotoSection[ window.location.hash ];
	};

	scrollAnimate = ScrollAnimator();
		scrollAnimate.init({
			// data
			animation: animation,	// animation data
			
			// settings
			maxScroll: 5400,			// max scroll
			useRAF : true,				// set requestAnimationFrame
			tickSpeed: 50,				// set interval (ms) if not using RAF
			scrollSpeed: 15,
			debug: false,				// turn on debug
			tweenSpeed: .3,				// scrollTop tween speed
			startAt: settings.startAt,	// scrollTop where the experience starts
			container: $('#main'),		// main container

			// callbacks
			onStart: function() {
				$('#side-nav').css({
					'right': 0
				})
			},
			onResize: function() {
				$('#main').width($(window).width() - $('#side-nav').width());
			},
			onUpdate: function() {
				// if (shouldUpdate == true) {
				// 	nav.updateScroll( scrollAnimate.getScrollTop() / scrollAnimate.getMaxScroll() );
				// }
			}
		});

})(jQuery);